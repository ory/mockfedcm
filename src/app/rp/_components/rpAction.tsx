"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { FEDCM_IDP_PREFIX } from "@/utils/fedcmStorage";
import CodeSnippet from "@/components/ui/codeSnippet";
import StatusTable from "@/components/ui/statusTable";

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
  mediation?: "optional" | "required" | "silent";
  signal?: AbortSignal;
}

function RPActionContent() {
  const searchParams = useSearchParams();
  const idpNames = searchParams.getAll("idp");
  const globalContext = searchParams.get("context") || "signin"; // Default to signin if not provided

  const [isFedCMSupported, setIsFedCMSupported] = useState<boolean | null>(
    null,
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
    null,
  );
  const [decodedTokenClaims, setDecodedTokenClaims] = useState<object | null>(
    null,
  );
  const [serializableFedCMResponse, setSerializableFedCMResponse] = useState<
    object | null
  >(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authAttempted, setAuthAttempted] = useState<boolean>(false);
  // Add state to specifically track login-related errors
  const [isLoginRequiredError, setIsLoginRequiredError] =
    useState<boolean>(false);

  // Add refs to track if operations have been performed
  const configsLoadedRef = useRef<boolean>(false);
  const providerConfigsFetchedRef = useRef<boolean>(false);
  // Add a ref to track if authentication is currently in progress
  const authInProgressRef = useRef<boolean>(false);

  // Check if FedCM is supported
  useEffect(() => {
    if (
      typeof navigator !== "undefined" &&
      navigator.credentials &&
      typeof navigator.credentials.get === "function"
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
      setError("No IdP specified in the URL");
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
        setError("No valid IdP configurations found for the specified names");
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
            `Fetching configuration for ${idp.name} from ${idp.configURL}`,
          );
          const response = await fetch(idp.configURL);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch configuration for ${idp.name}: ${response.status} ${response.statusText}`,
            );
          }
          return { name: idp.name, config: await response.json() };
        } catch (err) {
          console.error(
            `Error fetching IdP configuration for ${idp.name}:`,
            err,
          );
          return { name: idp.name, error: err };
        }
      });

      try {
        const results = await Promise.all(configPromises);
        const configsMap: Record<string, IdpConfig> = {};
        let hasError = false;

        results.forEach((result) => {
          if ("config" in result) {
            configsMap[result.name] = result.config;
          } else {
            hasError = true;
          }
        });

        if (Object.keys(configsMap).length === 0) {
          setError("Failed to fetch all IdP provider configurations");
        } else {
          setIdpProviderConfigs(configsMap);
          if (hasError) {
            console.warn(
              "Some IdP provider configurations could not be loaded",
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
      // Clear previous errors and login required flag before a new attempt
      setError(null);
      setIsLoginRequiredError(false);

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
          setError(
            "No valid provider configurations available for authentication",
          );
          return;
        }

        const requestOptions: CredentialRequestOptions = {
          identity: { providers: providers, context: globalContext },
          mediation: "optional",
        };
        setFedCMRequest(requestOptions);

        try {
          console.log("Initiating FedCM authentication request...");
          const credential = await navigator.credentials.get(requestOptions);
          console.log("FedCM authentication request completed successfully");
          setFedCMResponse(credential);
          setIsAuthenticated(true);
        } catch (err: unknown) {
          console.error("FedCM authentication request failed:", err);
          const errorMessage = `FedCM authentication failed: ${err}`;
          setError(errorMessage);
          setIsAuthenticated(false);

          // Check if the error suggests login is required
          if (
            err instanceof Error &&
            (err.name === "IdentityCredentialError" ||
              err.name === "NetworkError")
          ) {
            console.log("Detected potential login required error:", err.name);
            setIsLoginRequiredError(true);
          }
        }
      } catch (err: unknown) {
        // Catch errors during provider/request preparation
        console.error("Error preparing authentication request:", err);
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
    console.log("Core config changed, resetting authAttempted.");
    setAuthAttempted(false);
    // Optionally clear error when config changes, as the next attempt might succeed
    // setError(null);
  }, [idpConfigs, idpProviderConfigs, globalContext]);

  // Log the fedCMResponse state, decode token, and create serializable object when it updates
  useEffect(() => {
    if (fedCMResponse) {
      console.log("fedCMResponse (updated state):", fedCMResponse);

      // Create a plain object for serialization
      const serializableResponse: Record<string, string | undefined | null> = {
        id: fedCMResponse.id,
        type: fedCMResponse.type,
      };

      // Check for properties specific to FederatedCredential
      if (
        "provider" in fedCMResponse &&
        typeof fedCMResponse.provider === "string"
      ) {
        serializableResponse.provider = fedCMResponse.provider;
      }
      if ("token" in fedCMResponse && typeof fedCMResponse.token === "string") {
        serializableResponse.token = fedCMResponse.token; // Might be truncated in display, full token in claims

        // Decode the token
        try {
          const token = fedCMResponse.token;
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join(""),
          );
          setDecodedTokenClaims(JSON.parse(jsonPayload));
          console.log("Decoded JWT Claims:", JSON.parse(jsonPayload));
        } catch (error) {
          console.error("Failed to decode JWT token:", error);
          setDecodedTokenClaims({ error: "Failed to decode token" });
        }
      } else {
        setDecodedTokenClaims({
          type: fedCMResponse.type,
          id: fedCMResponse.id,
        });
      }

      // Check for properties specific to PasswordCredential (if needed)
      if ("name" in fedCMResponse && typeof fedCMResponse.name === "string") {
        serializableResponse.name = fedCMResponse.name;
      }
      if (
        "iconURL" in fedCMResponse &&
        typeof fedCMResponse.iconURL === "string"
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
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
        <div className="card w-full max-w-lg bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-error">FedCM Not Supported</h2>
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

  const idpValues: string[][] | undefined = [];
  const idpColors: string[] | undefined = [];

  idpConfigs.map((idp) => {
    idpValues.push([
      idp.name,
      idpProviderConfigs[idp.name] ? "Loaded" : "Failed",
    ]);
    idpColors.push(
      idpProviderConfigs[idp.name] ? "bg-green-400" : "bg-red-400",
    );
  });

  if (
    isLoginRequiredError && // Use the new specific state flag
    !isAuthenticated &&
    Object.values(idpProviderConfigs).some((config) => config.login_url)
  ) {
    // Find the first provider with a login_url
    const providerWithLogin = Object.values(idpProviderConfigs).find(
      (config) => config.login_url,
    );

    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
        <div className="card w-full max-w-lg bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-warning">Authentication Required</h2>
            <p>It seems you need to log in to the identity provider first.</p>
            <p className="text-sm text-error mt-2">{error}</p>
            <div className="card-actions justify-center mt-4">
              <a
                href={providerWithLogin?.login_url}
                className="btn btn-primary"
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
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
        <div className="card w-full max-w-lg bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-error">Error</h2>
            <p>{error}</p>
            {idpNames.length === 0 && (
              <p className="mt-2">No IdP names specified in the URL</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="self-stretch py-32 inline-flex flex-col justify-center items-start gap-16">
      <div className="self-stretch justify-start text-gray-900 text-2xl font-normal font-['Space_Grotesk'] leading-7">
        FedCM Authentication
      </div>

      <div className="self-stretch p-8 bg-white rounded-lg outline outline-offset-[-1px] outline-gray-300 inline-flex flex-col justify-start items-center gap-11">
        {/* Left Column: Status Card */}
        <div className="self-stretch inline-flex justify-center items-center gap-2">
          <div className="flex-1 justify-start text-gray-900 text-2xl font-normal font-['Space_Grotesk'] leading-7">
            Authentication Status
          </div>
          <div
            data-status="Success"
            className={`px-3 py-1.5 rounded flex justify-center items-center gap-2.5 ${
              isAuthenticated ? "bg-green-400" : "bg-yellow-400"
            } mr-2`}
          >
            <div className="justify-start text-green-950 text-sm font-normal leading-none tracking-tight">
              {isAuthenticated ? "Authenticated" : "Pending"}
            </div>
          </div>
        </div>

        <div className="self-stretch inline-flex justify-start items-start gap-2">
          <div className="justify-start text-fuchsia-500 text-base font-normal font-['JetBrains_Mono'] leading-relaxed">
            {">"}_
          </div>
          <div className="flex-1 justify-start text-gray-900 text-base font-normal font-['JetBrains_Mono'] leading-relaxed">
            {isAuthenticated
              ? "Successfully authenticated"
              : "Authentication in progress"}
          </div>
        </div>

        {isAuthenticated && decodedTokenClaims && (
          <CodeSnippet
            title="User Details (Decoded Token)"
            label="token.json"
            defaultMessage="Decoding token or no token received..."
            codeSnippet={decodedTokenClaims}
          />
        )}

        <StatusTable
          title="IdP Configurations"
          headers={["Name", "Status"]}
          values={idpValues}
          statusColors={idpColors}
        />

        <StatusTable
          title="Global Settings"
          headers={["Setting", "Value"]}
          values={[["Context", globalContext]]}
          statusColors={["bg-cyan-400"]}
        />
      </div>

      {/* Technical Details Section */}
      <div className="self-stretch p-8 bg-white rounded-lg outline outline-offset-[-1px] outline-fuchsia-500 inline-flex flex-col justify-start items-center gap-11">
        <div className="self-stretch justify-start text-gray-900 text-2xl font-normal font-['Space_Grotesk'] leading-7">
          Technical Details
        </div>

        <CodeSnippet
          title="FedCM Request"
          label="request.json"
          defaultMessage="No request made yet"
          codeSnippet={fedCMRequest}
        />
        <CodeSnippet
          title="FedCM Response"
          label="response.json"
          defaultMessage="No response received yet"
          codeSnippet={serializableFedCMResponse}
        />
        <CodeSnippet
          title="Loaded IdP Configurations"
          label="config.json"
          defaultMessage="No configurations loaded"
          codeSnippet={idpConfigs}
        />
      </div>
    </div>
  );
}

export default function RPAction() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
          <div className="card w-full max-w-lg bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <h2 className="card-title mt-4">Loading...</h2>
            </div>
          </div>
        </div>
      }
    >
      <RPActionContent />
    </Suspense>
  );
}
