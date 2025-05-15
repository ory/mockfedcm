"use client";

import React, { useCallback, useEffect, useState, useMemo } from "react";
import TextInput from "@/components/ui/textInput";
import ToggleInput from "@/components/ui/toggle";
import Button from "@/components/ui/button";
import ContextSelect, { FedCMContext } from "./contextSelect";
import { generateNonce } from "@/utils/generateNonce";
import { generateClientId } from "@/utils/generateClientId";
import { isHttpsEnabled } from "@/utils/https";
import { useRouter } from "next/navigation";
import { Check, Copy, Plus, Save, Trash2, Webhook } from "lucide-react";
import { RefreshCcw } from "lucide-react";

// Constants moved to separate object for better reusability
const STORAGE_KEYS = {
  IDP_LIST: "fedcm_idp_list",
  IDP_PREFIX: "fedcm_idp_",
  GLOBAL_CONTEXT: "fedcm_global_context",
} as const;

export interface FedCMConfig {
  name: string;
  configURL: string;
  clientId: string;
  nonce: string;
  useLoginHint: boolean;
  loginHint?: string;
}

// Default configurations extracted for reusability
const DEFAULT_IDP_CONFIG: FedCMConfig = {
  name: "Default IdP",
  configURL: "",
  clientId: "",
  nonce: "",
  useLoginHint: false,
  loginHint: "",
};

interface IdPConfigCardProps {
  idp: FedCMConfig;
  index: number;
  updateIdpConfig: (
    index: number,
    key: keyof FedCMConfig,
    value: string | boolean,
  ) => void;
  handleGenerateNewNonce: (index: number) => void;
  saveIdp: (index: number) => void;
  removeIdp: (index: number) => void;
  canRemove: boolean;
}

// Separate component for IdP configuration card to improve readability and reusability
const IdPConfigCard: React.FC<IdPConfigCardProps> = ({
  idp,
  index,
  updateIdpConfig,
  handleGenerateNewNonce,
  saveIdp,
  removeIdp,
  canRemove,
}) => (
  <div className="self-stretch p-8 bg-white rounded-lg outline outline-offset-[-1px] outline-gray-300 inline-flex flex-col justify-start items-center gap-8">
    <div className="self-stretch inline-flex flex-col justify-start gap-6">
      <h3 className="font-medium text-center text-lg">
        {idp.name || `FedCM IdP ${index + 1}`}
      </h3>

      <TextInput
        label="IdP Name"
        placeholder="Friendly name for this IdP"
        value={idp.name}
        onChange={(value) => updateIdpConfig(index, "name", value)}
        required
      />

      <TextInput
        label="Config URL"
        type="url"
        placeholder="https://example.com/fedcm.json"
        value={idp.configURL}
        onChange={(value) => updateIdpConfig(index, "configURL", value)}
        required
      />

      <TextInput
        label="Client ID"
        placeholder="your-client-id"
        value={idp.clientId}
        onChange={(value) => updateIdpConfig(index, "clientId", value)}
        required
      />

      <div className="self-stretch inline-flex flex-col justify-start items-start gap-1">
        <div className="self-stretch inline-flex justify-start items-center gap-8">
          <label className="text-sm font-medium">Nonce</label>
        </div>
        <div className="self-stretch p-3 bg-white rounded outline outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-2 overflow-hidden">
          <input
            type="text"
            value={idp.nonce}
            readOnly
            className="flex-1 justify-start text-gray-900 text-base font-normal font-['Schibsted_Grotesk'] leading-none"
          />
          <Button
            type="button"
            onClick={() => handleGenerateNewNonce(index)}
            variant="ghost"
            size="sm"
            className="join-item bg-white border-0"
            title="Regenerate nonce"
          >
            <RefreshCcw size={20} strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      {idp.useLoginHint && (
        <TextInput
          label="Login Hint"
          placeholder="user@example.com"
          value={idp.loginHint || ""}
          onChange={(value) => updateIdpConfig(index, "loginHint", value)}
        />
      )}
    </div>

    <ToggleInput
      label="Use Login Hint"
      checked={idp.useLoginHint}
      onChange={(checked) => updateIdpConfig(index, "useLoginHint", checked)}
    />

    <div className="flex justify-end gap-2 mt-4">
      <Button
        type="button"
        onClick={() => saveIdp(index)}
        variant="ghost"
        size="sm"
        className="text-primary bg-subtle"
        title="Save this IdP configuration"
      >
        <Save size={20} strokeWidth={1.5} />
        Save
      </Button>

      {canRemove && (
        <Button
          type="button"
          onClick={() => removeIdp(index)}
          variant="ghost"
          size="sm"
          className="text-error"
          title="Remove this IdP"
        >
          <Trash2 />
          Remove
        </Button>
      )}
    </div>
  </div>
);

interface JsonOutputDisplayProps {
  jsonOutput: string;
  countdown: number | null;
  handleTest: () => void;
  handleCancelTest: () => void;
  handleCopy: () => void;
  copied: boolean;
}

// Separate component for JSON output display
const JsonOutputDisplay: React.FC<JsonOutputDisplayProps> = ({
  jsonOutput,
  countdown,
  handleTest,
  handleCancelTest,
  handleCopy,
  copied,
}) => (
  <div className="self-stretch p-8 mt-2 bg-white rounded-lg outline outline-offset-[-1px] outline-fuchsia-500 inline-flex flex-col justify-start items-center gap-11">
    <div className="self-stretch inline-flex justify-center items-center gap-2">
      <div className="flex-1 justify-start text-gray-900 text-2xl font-normal font-['Space_Grotesk'] leading-7">
        Generated Configuration
      </div>
    </div>
    <div className="self-stretch px-4 pt-4 pb-6 bg-gray-50 rounded-lg outline outline-offset-[-1px] outline-gray-100 inline-flex flex-col justify-start items-start gap-6">
      <div className="self-stretch inline-flex justify-start items-center gap-4">
        <div className="flex-1 justify-start text-gray-400 text-base font-normal font-['JetBrains_Mono'] leading-relaxed">
          config.json
        </div>
        <div data-state="Default" className="w-5 h-5 relative">
          <div className="w-5 h-5 left-0 top-0 absolute overflow-hidden">
            <div
              className="w-4 h-4 relative overflow-hidden cursor-pointer"
              onClick={handleCopy}
              title={copied ? "Copied!" : "Copy to clipboard"}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 left-[3.33px] top-[3.33px] text-fuchsia-500" />
              ) : (
                <Copy className="w-3.5 h-3.5 left-[3.33px] top-[3.33px] text-fuchsia-500" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch px-4 pt-4 pb-6 bg-gray-50 rounded-lg outline outline-offset-[-1px] outline-gray-100 inline-flex flex-col justify-start items-start gap-6">
        <div className="self-stretch inline-flex justify-start items-center gap-4">
          <pre className="bg-base-200 p-4 rounded-lg overflow-x-auto">
            <code>{jsonOutput}</code>
          </pre>
        </div>
      </div>
    </div>
    <div className="card-actions justify-end mt-4">
      {countdown !== null ? (
        <>
          <span className="text-sm self-center mr-2">
            Testing in {countdown}s...
          </span>
          <Button onClick={handleCancelTest} variant="ghost">
            Cancel
          </Button>
        </>
      ) : (
        <div
          data-state="Default"
          className="px-4 py-3.5 bg-gray-900 rounded inline-flex justify-center items-center overflow-hidden"
        >
          <div className="flex justify-center items-center">
            <div
              className="justify-start text-white text-sm font-normal font-['Schibsted_Grotesk'] leading-none cursor-pointer"
              onClick={handleTest}
            >
              Test Configuration
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

interface StorageResult {
  idps: FedCMConfig[] | null;
  globalContext: FedCMContext | null;
}

// Custom hook for FedCM storage operations
const useFedCMStorage = () => {
  const saveIdpToLocalStorage = useCallback((idp: FedCMConfig): void => {
    if (!idp.name) return;

    // Save the IdP configuration
    localStorage.setItem(
      `${STORAGE_KEYS.IDP_PREFIX}${idp.name}`,
      JSON.stringify(idp),
    );

    // Update the list of IdP names
    const existingList: string[] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.IDP_LIST) || "[]",
    );
    if (!existingList.includes(idp.name)) {
      existingList.push(idp.name);
      localStorage.setItem(STORAGE_KEYS.IDP_LIST, JSON.stringify(existingList));
    }
  }, []);

  const saveGlobalContext = useCallback((context: FedCMContext): void => {
    localStorage.setItem(STORAGE_KEYS.GLOBAL_CONTEXT, context);
  }, []);

  const removeIdpFromLocalStorage = useCallback((idpName: string): void => {
    localStorage.removeItem(`${STORAGE_KEYS.IDP_PREFIX}${idpName}`);

    const idpList: string[] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.IDP_LIST) || "[]",
    );
    const updatedList = idpList.filter((name) => name !== idpName);
    localStorage.setItem(STORAGE_KEYS.IDP_LIST, JSON.stringify(updatedList));
  }, []);

  const loadConfigurationsFromLocalStorage = useCallback((): StorageResult => {
    try {
      const idpList: string[] = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.IDP_LIST) || "[]",
      );

      if (idpList.length === 0) {
        return { idps: null, globalContext: null };
      }

      const loadedIdps: FedCMConfig[] = [];

      idpList.forEach((idpName) => {
        const idpData = localStorage.getItem(
          `${STORAGE_KEYS.IDP_PREFIX}${idpName}`,
        );
        if (idpData) {
          try {
            const parsedIdp: FedCMConfig = JSON.parse(idpData);
            loadedIdps.push(parsedIdp);
          } catch (e) {
            console.error(`Failed to parse IdP data for ${idpName}`, e);
          }
        }
      });

      const savedContext = localStorage.getItem(
        STORAGE_KEYS.GLOBAL_CONTEXT,
      ) as FedCMContext | null;

      return {
        idps: loadedIdps.length > 0 ? loadedIdps : null,
        globalContext: savedContext,
      };
    } catch (e) {
      console.error("Failed to load configurations from localStorage", e);
      return { idps: null, globalContext: null };
    }
  }, []);

  return {
    saveIdpToLocalStorage,
    saveGlobalContext,
    removeIdpFromLocalStorage,
    loadConfigurationsFromLocalStorage,
  };
};

interface FedCMProvider {
  configURL: string;
  clientId: string;
  nonce: string;
  loginHint?: string;
}

interface FedCMOptions {
  identity: {
    context: FedCMContext;
    providers: FedCMProvider[];
  };
}

// Main component
const FedCMRPForm: React.FC = () => {
  const router = useRouter();
  const [idps, setIdps] = useState<FedCMConfig[]>([{ ...DEFAULT_IDP_CONFIG }]);
  const [globalContext, setGlobalContext] = useState<FedCMContext>(
    FedCMContext.SignIn,
  );
  const [jsonOutput, setJsonOutput] = useState<string>("");
  const [autoTest, setAutoTest] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [testTimerId, setTestTimerId] = useState<NodeJS.Timeout | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const {
    saveIdpToLocalStorage,
    saveGlobalContext,
    removeIdpFromLocalStorage,
    loadConfigurationsFromLocalStorage,
  } = useFedCMStorage();

  // Memoized validation function to improve performance
  const validateIdps = useMemo((): FedCMConfig[] => {
    return idps.filter(
      (idp) => idp.name && idp.configURL && idp.clientId && idp.nonce,
    );
  }, [idps]);

  const handleTest = useCallback((): void => {
    const validIdps = validateIdps;

    if (validIdps.length === 0) {
      alert("Please fill out at least one complete IdP configuration");
      return;
    }

    // Save all valid IdPs to localStorage before testing
    validIdps.forEach((idp) => saveIdpToLocalStorage(idp));
    saveGlobalContext(globalContext);

    // Build query parameters with just the IdP names and global context
    const params = new URLSearchParams();
    validIdps.forEach((idp) => {
      params.append("idp", idp.name);
    });
    params.append("context", globalContext);

    // Navigate to the test URL
    router.push(`/rp/action?${params.toString()}`);
  }, [
    validateIdps,
    globalContext,
    router,
    saveIdpToLocalStorage,
    saveGlobalContext,
  ]);

  // Load configurations on initial render
  useEffect(() => {
    const { idps: savedIdps, globalContext: savedContext } =
      loadConfigurationsFromLocalStorage();

    if (savedIdps) {
      setIdps(savedIdps);
    }

    if (savedContext) {
      setGlobalContext(savedContext);
    }
  }, [loadConfigurationsFromLocalStorage]);

  // Generate nonces for IdPs without one
  useEffect(() => {
    setIdps((prevIdps) => {
      return prevIdps.map((idp) => {
        return idp.nonce ? idp : { ...idp, nonce: generateNonce() };
      });
    });
  }, []);

  // Handle countdown timer
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timerId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (countdown === 0) {
      handleTest();
      setCountdown(null);
    }
  }, [countdown, handleTest]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (testTimerId) {
        clearTimeout(testTimerId);
      }
    };
  }, [testTimerId]);

  const handleGenerateNewNonce = useCallback((index: number): void => {
    setIdps((prevIdps) => {
      const updatedIdps = [...prevIdps];
      updatedIdps[index] = { ...updatedIdps[index], nonce: generateNonce() };
      return updatedIdps;
    });
  }, []);

  const updateIdpConfig = useCallback(
    (index: number, key: keyof FedCMConfig, value: string | boolean): void => {
      setIdps((prevIdps) => {
        const updatedIdps = [...prevIdps];
        updatedIdps[index] = { ...updatedIdps[index], [key]: value };
        return updatedIdps;
      });
    },
    [],
  );

  const addNewIdp = useCallback((): void => {
    const newIdpName = `IdP ${idps.length + 1}`;
    setIdps((prevIdps) => [
      ...prevIdps,
      {
        ...DEFAULT_IDP_CONFIG,
        name: newIdpName,
        nonce: generateNonce(),
      },
    ]);
  }, [idps.length]);

  const saveIdp = useCallback(
    (index: number): void => {
      const idp = idps[index];
      saveIdpToLocalStorage(idp);
      saveGlobalContext(globalContext);
    },
    [idps, globalContext, saveIdpToLocalStorage, saveGlobalContext],
  );

  const removeIdp = useCallback(
    (index: number): void => {
      if (idps.length > 1) {
        const idpToRemove = idps[index];
        removeIdpFromLocalStorage(idpToRemove.name);
        setIdps((prevIdps) => prevIdps.filter((_, i) => i !== index));
      }
    },
    [idps, removeIdpFromLocalStorage],
  );

  const handleCancelTest = useCallback((): void => {
    setCountdown(null);
    if (testTimerId) {
      clearTimeout(testTimerId);
      setTestTimerId(null);
    }
  }, [testTimerId]);

  const handleSubmit = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();

      // Cancel any existing countdown
      if (testTimerId) {
        clearTimeout(testTimerId);
        setTestTimerId(null);
      }

      const validIdps = validateIdps;

      if (validIdps.length === 0) {
        alert("Please fill out at least one complete IdP configuration");
        return;
      }

      // Save all valid IdPs to localStorage
      validIdps.forEach((idp) => saveIdpToLocalStorage(idp));
      saveGlobalContext(globalContext);

      // Update state with only valid IdPs
      setIdps(validIdps);

      // Create the FedCM options object using all valid providers
      const providers: FedCMProvider[] = validIdps.map((idp) => {
        const provider: FedCMProvider = {
          configURL: idp.configURL,
          clientId: idp.clientId,
          nonce: idp.nonce,
        };

        // Only include login hint if it's enabled and has a value
        if (idp.useLoginHint && idp.loginHint) {
          provider.loginHint = idp.loginHint;
        }

        return provider;
      });

      // Format in the navigator.credentials.get structure
      const fedCmOptions: FedCMOptions = {
        identity: {
          context: globalContext,
          providers,
        },
      };

      // Format the JSON output with pretty printing
      setJsonOutput(JSON.stringify(fedCmOptions, null, 2));

      // If auto test is enabled, navigate to the test URL
      if (autoTest) {
        setCountdown(5);
      }
    },
    [
      validateIdps,
      testTimerId,
      globalContext,
      autoTest,
      saveIdpToLocalStorage,
      saveGlobalContext,
    ],
  );

  const addMockFedCMIdp = useCallback((): void => {
    const protocol = isHttpsEnabled() ? "https" : "http";
    const baseUrl = process.env.NEXT_PUBLIC_APP_FQDN
      ? `${protocol}://${process.env.NEXT_PUBLIC_APP_FQDN}`
      : "";

    if (!baseUrl) {
      alert("Error: NEXT_PUBLIC_APP_FQDN environment variable is not set.");
      return;
    }

    const configURL = `${baseUrl}/api/fedcm/config.json`;
    const baseName = "MockFedCM IdP";

    // Efficiently determine a unique name
    const existingNames = new Set(idps.map((idp) => idp.name));
    let newName = baseName;
    let counter = 1;

    while (existingNames.has(newName)) {
      newName = `${baseName} ${counter++}`;
    }

    const newIdp: FedCMConfig = {
      name: newName,
      configURL,
      clientId: generateClientId(),
      nonce: generateNonce(),
      useLoginHint: false,
      loginHint: "",
    };

    // Check if the current state only contains the initial placeholder
    const isDefaultOnly =
      idps.length === 1 &&
      idps[0].name === DEFAULT_IDP_CONFIG.name &&
      !idps[0].configURL &&
      !idps[0].clientId &&
      !idps[0].useLoginHint &&
      (!idps[0].loginHint || idps[0].loginHint === "");

    setIdps(isDefaultOnly ? [newIdp] : [...idps, newIdp]);
  }, [idps]);

  return (
    <div className="self-stretch py-12 lg:py-32 inline-flex flex-col justify-center items-start gap-16">
      <div className="self-stretch p-8 bg-white rounded-lg outline outline-offset-[-1px] outline-gray-300 flex flex-col justify-start items-center gap-11">
        <div className="self-stretch inline-flex justify-center items-center gap-2">
          <div className="flex-1 justify-start text-gray-900 text-2xl font-normal font-['Space_Grotesk'] leading-7">
            FedCM Configuration
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="self-stretch flex flex-col justify-start items-start gap-8"
        >
          <div className="self-stretch p-8 bg-white rounded-lg outline outline-offset-[-1px] outline-gray-300 inline-flex flex-col justify-start items-center gap-8">
            <h3 className="font-medium text-center text-lg mb-4 text-gray-900 font-['Schibsted_Grotesk'] leading-tight">
              Global Settings
            </h3>
            <ContextSelect
              value={globalContext}
              onChange={(value) => setGlobalContext(value)}
            />
          </div>

          {/* Button to add MockFedCM IdP */}
          <div className="flex justify-center self-stretch">
            <Button
              type="button"
              onClick={addMockFedCMIdp}
              variant="ghost"
              className="gap-2"
            >
              <Webhook />
              <span className="text-gray-900 text-sm font-normal font-['Schibsted_Grotesk'] leading-none">
                Use MockFedCM IdP
              </span>
            </Button>
          </div>

          {/* IdP configuration cards */}
          {idps.map((idp, index) => (
            <IdPConfigCard
              key={`idp-${index}`}
              idp={idp}
              index={index}
              updateIdpConfig={updateIdpConfig}
              handleGenerateNewNonce={handleGenerateNewNonce}
              saveIdp={saveIdp}
              removeIdp={removeIdp}
              canRemove={idps.length > 1}
            />
          ))}

          <div className="flex justify-center self-stretch">
            <Button
              type="button"
              onClick={addNewIdp}
              variant="ghost"
              className="gap-2"
            >
              <Plus size={18} />
              <span className="text-gray-900 text-sm font-normal font-['Schibsted_Grotesk'] leading-none">
                Add IdP
              </span>
            </Button>
          </div>

          <ToggleInput
            label="Auto Test (automatically run test after 5 seconds)"
            checked={autoTest}
            onChange={(checked) => setAutoTest(checked)}
          />

          <div className="self-stretch flex flex-col justify-start items-end gap-3">
            <Button type="submit" variant="primary">
              <span className="text-white text-sm font-normal font-['Schibsted_Grotesk'] leading-none">
                Generate Configuration
              </span>
            </Button>
          </div>
        </form>
      </div>

      {/* Display JSON output if available */}
      {jsonOutput && (
        <JsonOutputDisplay
          jsonOutput={jsonOutput}
          countdown={countdown}
          handleTest={handleTest}
          handleCancelTest={handleCancelTest}
          handleCopy={handleCopy}
          copied={copied}
        />
      )}
    </div>
  );
};

export default FedCMRPForm;
