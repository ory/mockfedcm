'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

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
  const configURL = searchParams.get('configURL');
  const clientId = searchParams.get('clientId');
  const nonce = searchParams.get('nonce');
  const loginHint = searchParams.get('loginHint');
  const context = searchParams.get('context');

  const [isFedCMSupported, setIsFedCMSupported] = useState<boolean | null>(
    null
  );
  const [idpConfig, setIdpConfig] = useState<IdpConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fedCMRequest, setFedCMRequest] =
    useState<CredentialRequestOptions | null>(null);
  const [fedCMResponse, setFedCMResponse] = useState<Credential | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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

  // Fetch IdP configuration
  useEffect(() => {
    const fetchConfig = async () => {
      if (!configURL) {
        setError('Missing configURL parameter');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(configURL);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch configuration: ${response.status} ${response.statusText}`
          );
        }
        const config = await response.json();
        setIdpConfig(config);
        setLoading(false);
      } catch (err) {
        setError(`Error fetching IdP configuration: ${err}`);
        setLoading(false);
      }
    };

    if (configURL) {
      fetchConfig();
    } else {
      setLoading(false);
    }
  }, [configURL]);

  // Attempt FedCM authentication
  useEffect(() => {
    const attemptFedCMAuth = async () => {
      if (!isFedCMSupported || !configURL || !clientId || !idpConfig) return;

      // Create request options according to FedCM API specification
      const requestOptions: CredentialRequestOptions = {
        identity: {
          providers: [
            {
              configURL: configURL,
              clientId: clientId,
            },
          ],
        },
        mediation: 'optional',
      };

      // Add optional parameters if they exist
      if (nonce) {
        requestOptions.identity!.providers[0].nonce = nonce;
      }
      if (loginHint) {
        requestOptions.identity!.providers[0].loginHint = loginHint;
      }
      // Context is at the identity level, not in the providers array
      if (context) {
        requestOptions.identity!.context = context;
      }

      setFedCMRequest(requestOptions);

      try {
        const credential = await navigator.credentials.get(requestOptions);
        setFedCMResponse(credential);
        setIsAuthenticated(true);
      } catch (err: unknown) {
        setError(`FedCM authentication failed: ${err}`);
        setIsAuthenticated(false);
      }
    };

    if (isFedCMSupported && idpConfig && !isAuthenticated && !loading) {
      attemptFedCMAuth();
    }
  }, [
    isFedCMSupported,
    idpConfig,
    configURL,
    clientId,
    nonce,
    loginHint,
    context,
    loading,
    isAuthenticated,
  ]);

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

  if (error && !isAuthenticated && idpConfig?.login_url) {
    return (
      <div className='min-h-screen bg-base-200 flex flex-col items-center justify-center p-4'>
        <div className='card w-full max-w-lg bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title text-warning'>Authentication Required</h2>
            <p>It seems you need to log in to the identity provider first.</p>
            <p className='text-sm text-error mt-2'>{error}</p>
            <div className='card-actions justify-center mt-4'>
              <a href={idpConfig.login_url} className='btn btn-primary'>
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
            {!configURL && (
              <p className='mt-2'>Missing required configURL parameter</p>
            )}
            {!clientId && (
              <p className='mt-2'>Missing required clientId parameter</p>
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
          {/* Status Card */}
          <div className='card bg-base-100 shadow-xl'>
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

              {isAuthenticated && fedCMResponse && (
                <div className='mt-4'>
                  <h3 className='font-semibold text-lg mb-2'>User Details</h3>
                  <div className='bg-base-200 p-3 rounded-lg'>
                    <pre className='overflow-x-auto text-sm'>
                      {JSON.stringify(fedCMResponse, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Parameters Card */}
          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title'>Request Parameters</h2>
              <div className='overflow-x-auto'>
                <table className='table table-zebra'>
                  <tbody>
                    <tr>
                      <td className='font-medium'>configURL</td>
                      <td className='break-all'>
                        {configURL || 'Not provided'}
                      </td>
                    </tr>
                    <tr>
                      <td className='font-medium'>clientId</td>
                      <td>{clientId || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td className='font-medium'>nonce</td>
                      <td>{nonce || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td className='font-medium'>loginHint</td>
                      <td>{loginHint || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td className='font-medium'>context</td>
                      <td>{context || 'Not provided'}</td>
                    </tr>
                  </tbody>
                </table>
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
                    {fedCMResponse
                      ? JSON.stringify(fedCMResponse, null, 2)
                      : 'No response received yet'}
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
