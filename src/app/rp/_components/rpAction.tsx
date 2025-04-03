'use client';

import { useEffect, useState, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { FEDCM_IDP_PREFIX } from '@/utils/fedcmStorage';

interface BrandingIcon {
  url: string;
  size: number;
}

interface Branding {
  background_color: string;
  color: string;
  icons: BrandingIcon[];
}

// TypeScript Interfaces
interface IdpConfig {
  login_url: string;
  accounts_endpoint: string;
  client_metadata_endpoint: string;
  id_assertion_endpoint: string;
  branding: Branding;
  [key: string]: unknown;
}

// Interface for the saved FedCM IdP configuration
interface FedCMIdpConfig {
  name: string;
  configURL: string;
  clientId: string;
  nonce: string;
  useLoginHint: boolean;
  loginHint?: string;
}

// Following the FedCM API specification for credential requests
interface CredentialRequestOptions {
  identity?: {
    providers: Array<{
      configURL: string;
      clientId: string;
      nonce?: string;
      loginHint?: string;
    }>;
    context?: string;
  };
  mediation?: 'optional' | 'required' | 'silent';
  signal?: AbortSignal;
}

function RPActionContent() {
  const searchParams = useSearchParams();
  const idpNames = searchParams.getAll('idp');
  const globalContext = searchParams.get('context') || 'signin'; // Default to signin if not provided

  const [isFedCMSupported, setIsFedCMSupported] = useState<boolean | null>(
    null
  );
  const [idpConfigs, setIdpConfigs] = useState<FedCMIdpConfig[]>([]);
  const [idpProviderConfigs, setIdpProviderConfigs] = useState<
    Record<string, IdpConfig>
  >({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fedCMRequest, setFedCMRequest] =
    useState<CredentialRequestOptions | null>(null);
  const [fedCMResponse, setFedCMResponse] = useState<CredentialType | null>(
    null
  );
  const [decodedTokenClaims, setDecodedTokenClaims] = useState<object | null>(
    null
  );
  const [serializableFedCMResponse, setSerializableFedCMResponse] = useState<
    object | null
  >(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authAttempted, setAuthAttempted] = useState<boolean>(false);

  // Add refs to track if operations have been performed
  const configsLoadedRef = useRef<boolean>(false);
  const providerConfigsFetchedRef = useRef<boolean>(false);
  // Add a ref to track if authentication is currently in progress
  const authInProgressRef = useRef<boolean>(false);

  // Check if FedCM is supported
  useEffect(() => {
    if (
      typeof navigator !== 'undefined' &&
      navigator.credentials &&
      typeof navigator.credentials.get === 'function'
    ) {
      setIsFedCMSupported(true);
    } else {
      setIsFedCMSupported(false);
    }
  }, []);

  // Load configurations from localStorage
  useEffect(() => {
    // Skip if we've already loaded configurations
    if (configsLoadedRef.current) {
      return;
    }

    if (idpNames.length === 0) {
      setError('No IdP specified in the URL');
      setLoading(false);
      configsLoadedRef.current = true;
      return;
    }

    try {
      const loadedConfigs: FedCMIdpConfig[] = [];

      idpNames.forEach((name) => {
        const storedConfig = localStorage.getItem(`${FEDCM_IDP_PREFIX}${name}`);
        if (storedConfig) {
          try {
            const parsedConfig = JSON.parse(storedConfig);
            loadedConfigs.push(parsedConfig);
          } catch (e) {
            console.error(`Failed to parse configuration for IdP ${name}`, e);
          }
        } else {
          console.warn(`No stored configuration found for IdP ${name}`);
        }
      });

      if (loadedConfigs.length === 0) {
        setError('No valid IdP configurations found for the specified names');
        setLoading(false);
        configsLoadedRef.current = true;
        return;
      }

      setIdpConfigs(loadedConfigs);
      configsLoadedRef.current = true;
    } catch (e) {
      setError(`Error loading IdP configurations: ${e}`);
      setLoading(false);
      configsLoadedRef.current = true;
    }
  }, [idpNames]);

  // Fetch IdP provider configurations
  useEffect(() => {
    // Skip if we've already fetched provider configs or if idpConfigs is empty
    if (providerConfigsFetchedRef.current || idpConfigs.length === 0) {
      return;
    }

    // Set to true immediately to prevent multiple fetches
    providerConfigsFetchedRef.current = true;

    const fetchConfigs = async () => {
      const configPromises = idpConfigs.map(async (idp) => {
        try {
          console.log(
            `Fetching configuration for ${idp.name} from ${idp.configURL}`
          );
          const response = await fetch(idp.configURL);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch configuration for ${idp.name}: ${response.status} ${response.statusText}`
            );
          }
          return { name: idp.name, config: await response.json() };
        } catch (err) {
          console.error(
            `Error fetching IdP configuration for ${idp.name}:`,
            err
          );
          return { name: idp.name, error: err };
        }
      });

      try {
        const results = await Promise.all(configPromises);
        const configsMap: Record<string, IdpConfig> = {};
        let hasError = false;

        results.forEach((result) => {
          if ('config' in result) {
            configsMap[result.name] = result.config;
          } else {
            hasError = true;
          }
        });

        if (Object.keys(configsMap).length === 0) {
          setError('Failed to fetch all IdP provider configurations');
        } else {
          setIdpProviderConfigs(configsMap);
          if (hasError) {
            console.warn(
              'Some IdP provider configurations could not be loaded'
            );
          }
        }

        setLoading(false);
      } catch (err) {
        setError(`Error fetching IdP configurations: ${err}`);
        setLoading(false);
      }
    };

    fetchConfigs();
  }, [idpConfigs]);

  // Attempt FedCM authentication
  useEffect(() => {
    // Don't attempt authentication if we've already tried or prerequisites aren't met
    // or if authentication is currently in progress
    if (
      authAttempted || // Check if already attempted for this config set
      !isFedCMSupported ||
      idpConfigs.length === 0 ||
      Object.keys(idpProviderConfigs).length === 0 ||
      loading ||
      isAuthenticated ||
      authInProgressRef.current // Check if authentication is already in progress
    ) {
      return;
    }

    const attemptFedCMAuth = async () => {
      // Set the auth in progress flag
      authInProgressRef.current = true;
      // Clear previous errors before a new attempt
      setError(null);

      try {
        // Create providers array from all valid IdP configurations
        const providers = idpConfigs
          .filter((idp) => idpProviderConfigs[idp.name]) // Only include IdPs with successful provider config fetches
          .map((idp) => {
            const provider: {
              configURL: string;
              clientId: string;
              nonce?: string;
              loginHint?: string;
            } = {
              configURL: idp.configURL,
              clientId: idp.clientId,
            };

            if (idp.nonce) {
              provider.nonce = idp.nonce;
            }

            if (idp.useLoginHint && idp.loginHint) {
              provider.loginHint = idp.loginHint;
            }

            return provider;
          });

        if (providers.length === 0) {
          // This case should ideally be handled earlier, but double-check
          setError(
            'No valid provider configurations available for authentication'
          );
          // No need to set authAttempted here, let finally handle it
          return;
        }

        // Create request options according to FedCM API specification
        const requestOptions: CredentialRequestOptions = {
          identity: {
            providers: providers,
            context: globalContext,
          },
          mediation: 'optional',
        };

        setFedCMRequest(requestOptions);

        try {
          console.log('Initiating FedCM authentication request...');
          const credential = await navigator.credentials.get(requestOptions);
          console.log('FedCM authentication request completed successfully');
          setFedCMResponse(credential);
          setIsAuthenticated(true);
        } catch (err: unknown) {
          console.error('FedCM authentication request failed:', err);
          setError(`FedCM authentication failed: ${err}`);
          setIsAuthenticated(false);
        }
      } catch (err: unknown) {
        // Catch errors during provider/request preparation
        console.error('Error preparing authentication request:', err);
        setError(`Error preparing authentication: ${err}`);
      } finally {
        // Mark as attempted *after* the attempt finishes
        setAuthAttempted(true);
        // Always clear the auth in progress flag when done
        authInProgressRef.current = false;
      }
    };

    attemptFedCMAuth();
  }, [
    // Dependencies that should trigger a re-attempt if they change
    isFedCMSupported,
    idpConfigs,
    idpProviderConfigs,
    globalContext,
    // Control flags/state
    loading,
    isAuthenticated,
    authAttempted, // Include authAttempted to react to its reset
  ]);

  // Reset auth attempt ONLY when core configuration changes
  useEffect(() => {
    console.log('Core config changed, resetting authAttempted.');
    setAuthAttempted(false);
    // Optionally clear error when config changes, as the next attempt might succeed
    // setError(null);
  }, [idpConfigs, idpProviderConfigs, globalContext]);

  // Log the fedCMResponse state, decode token, and create serializable object when it updates
  useEffect(() => {
    if (fedCMResponse) {
      console.log('fedCMResponse (updated state):', fedCMResponse);

      // Create a plain object for serialization
      const serializableResponse: Record<string, string | undefined | null> = {
        id: fedCMResponse.id,
        type: fedCMResponse.type,
      };

      // Check for properties specific to FederatedCredential
      if (
        'provider' in fedCMResponse &&
        typeof fedCMResponse.provider === 'string'
      ) {
        serializableResponse.provider = fedCMResponse.provider;
      }
      if ('token' in fedCMResponse && typeof fedCMResponse.token === 'string') {
        serializableResponse.token = fedCMResponse.token; // Might be truncated in display, full token in claims

        // Decode the token
        try {
          const token = fedCMResponse.token;
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join('')
          );
          setDecodedTokenClaims(JSON.parse(jsonPayload));
          console.log('Decoded JWT Claims:', JSON.parse(jsonPayload));
        } catch (error) {
          console.error('Failed to decode JWT token:', error);
          setDecodedTokenClaims({ error: 'Failed to decode token' });
        }
      } else {
        setDecodedTokenClaims({
          type: fedCMResponse.type,
          id: fedCMResponse.id,
        });
      }

      // Check for properties specific to PasswordCredential (if needed)
      if ('name' in fedCMResponse && typeof fedCMResponse.name === 'string') {
        serializableResponse.name = fedCMResponse.name;
      }
      if (
        'iconURL' in fedCMResponse &&
        typeof fedCMResponse.iconURL === 'string'
      ) {
        serializableResponse.iconURL = fedCMResponse.iconURL;
      }
      // Add other credential types properties as needed

      setSerializableFedCMResponse(serializableResponse);
    } else {
      setDecodedTokenClaims(null);
      setSerializableFedCMResponse(null);
    }
  }, [fedCMResponse]);

  if (!isFedCMSupported) {
    return (
      <div className='min-h-screen bg-base-200 flex flex-col items-center justify-center p-4'>
        <div className='card w-full max-w-lg bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title text-error'>FedCM Not Supported</h2>
            <p>
              Your browser does not support the Federated Credential Management
              (FedCM) API. Please use a modern browser that supports this
              feature.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (
    error &&
    !isAuthenticated &&
    Object.values(idpProviderConfigs).some((config) => config.login_url)
  ) {
    // Find the first provider with a login_url
    const providerWithLogin = Object.values(idpProviderConfigs).find(
      (config) => config.login_url
    );

    return (
      <div className='min-h-screen bg-base-200 flex flex-col items-center justify-center p-4'>
        <div className='card w-full max-w-lg bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title text-warning'>Authentication Required</h2>
            <p>It seems you need to log in to the identity provider first.</p>
            <p className='text-sm text-error mt-2'>{error}</p>
            <div className='card-actions justify-center mt-4'>
              <a
                href={providerWithLogin?.login_url}
                className='btn btn-primary'
              >
                Log in to Identity Provider
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-base-200 flex flex-col items-center justify-center p-4'>
        <div className='card w-full max-w-lg bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title text-error'>Error</h2>
            <p>{error}</p>
            {idpNames.length === 0 && (
              <p className='mt-2'>No IdP names specified in the URL</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-base-200 p-4'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>FedCM Authentication</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Left Column: Status Card */}
          <div className='card bg-base-100 shadow-xl self-start'>
            <div className='card-body'>
              <h2 className='card-title'>Authentication Status</h2>
              <div className='mt-4'>
                <div className='flex items-center'>
                  <div
                    className={`badge ${
                      isAuthenticated ? 'badge-success' : 'badge-warning'
                    } mr-2`}
                  >
                    {isAuthenticated ? 'Authenticated' : 'Pending'}
                  </div>
                  <span>
                    {isAuthenticated
                      ? 'Successfully authenticated'
                      : 'Authentication in progress'}
                  </span>
                </div>
              </div>

              {isAuthenticated && decodedTokenClaims && (
                <div className='mt-4'>
                  <h3 className='font-semibold text-lg mb-2'>
                    User Details (Decoded Token)
                  </h3>
                  <div className='bg-base-200 p-3 rounded-lg'>
                    <pre className='overflow-x-auto text-sm'>
                      {decodedTokenClaims
                        ? JSON.stringify(decodedTokenClaims, null, 2)
                        : 'Decoding token or no token received...'}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Configuration Cards */}
          <div className='flex flex-col gap-6'>
            {/* IdP Configurations Card */}
            <div className='card bg-base-100 shadow-xl'>
              <div className='card-body'>
                <h2 className='card-title'>IdP Configurations</h2>
                <div className='overflow-x-auto'>
                  <table className='table table-zebra'>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {idpConfigs.map((idp, index) => (
                        <tr key={index}>
                          <td className='font-medium'>{idp.name}</td>
                          <td>
                            <div
                              className={`badge ${
                                idpProviderConfigs[idp.name]
                                  ? 'badge-success'
                                  : 'badge-error'
                              }`}
                            >
                              {idpProviderConfigs[idp.name]
                                ? 'Loaded'
                                : 'Failed'}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Remove global context display from here */}
              </div>
            </div>

            {/* Global Context Card */}
            <div className='card bg-base-100 shadow-xl'>
              <div className='card-body'>
                <h2 className='card-title'>Global Settings</h2>
                <div className='overflow-x-auto'>
                  <table className='table table-zebra'>
                    <thead>
                      <tr>
                        <th>Setting</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='font-medium'>Context</td>
                        <td>
                          <div className='badge badge-info'>
                            {globalContext}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details Section */}
        <div className='mt-6'>
          <h2 className='text-2xl font-bold mb-4'>Technical Details</h2>

          <div className='grid grid-cols-1 gap-6'>
            {/* FedCM Request */}
            <div className='card bg-base-100 shadow-xl'>
              <div className='card-body'>
                <h3 className='card-title'>FedCM Request</h3>
                <div className='bg-base-200 p-4 rounded-lg'>
                  <pre className='overflow-x-auto text-sm'>
                    {fedCMRequest
                      ? JSON.stringify(fedCMRequest, null, 2)
                      : 'No request made yet'}
                  </pre>
                </div>
              </div>
            </div>

            {/* FedCM Response */}
            <div className='card bg-base-100 shadow-xl'>
              <div className='card-body'>
                <h3 className='card-title'>FedCM Response</h3>
                <div className='bg-base-200 p-4 rounded-lg'>
                  <pre className='overflow-x-auto text-sm'>
                    {serializableFedCMResponse
                      ? JSON.stringify(serializableFedCMResponse, null, 2)
                      : 'No response received yet'}
                  </pre>
                </div>
              </div>
            </div>

            {/* IdP Configurations */}
            <div className='card bg-base-100 shadow-xl'>
              <div className='card-body'>
                <h3 className='card-title'>Loaded IdP Configurations</h3>
                <div className='bg-base-200 p-4 rounded-lg'>
                  <pre className='overflow-x-auto text-sm'>
                    {idpConfigs.length > 0
                      ? JSON.stringify(idpConfigs, null, 2)
                      : 'No configurations loaded'}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RPAction() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-base-200 flex flex-col items-center justify-center p-4'>
          <div className='card w-full max-w-lg bg-base-100 shadow-xl'>
            <div className='card-body items-center text-center'>
              <span className='loading loading-spinner loading-lg text-primary'></span>
              <h2 className='card-title mt-4'>Loading...</h2>
            </div>
          </div>
        </div>
      }
    >
      <RPActionContent />
    </Suspense>
  );
}
