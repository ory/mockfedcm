'use client';

import React, { useCallback, useEffect, useState } from 'react';
import TextInput from '@/components/ui/textInput';
import ToggleInput from '@/components/ui/toggle';
import Button from '@/components/ui/button';
import ContextSelect, { FedCMContext } from './contextSelect';
import { generateNonce } from '@/utils/generateNonce';
import { generateClientId } from '@/utils/generateClientId';
import { isHttpsEnabled } from '@/utils/https';
import {
  FEDCM_IDP_LIST_KEY,
  FEDCM_IDP_PREFIX,
  FEDCM_GLOBAL_CONTEXT_KEY,
} from '@/utils/fedcmStorage';
import { useRouter } from 'next/navigation';

export interface FedCMConfig {
  name: string;
  configURL: string;
  clientId: string;
  nonce: string;
  useLoginHint: boolean;
  loginHint?: string;
}

const FedCMRPForm = () => {
  const router = useRouter();
  const [idps, setIdps] = useState<FedCMConfig[]>([
    {
      name: 'Default IdP',
      configURL: '',
      clientId: '',
      nonce: '',
      useLoginHint: false,
      loginHint: '',
    },
  ]);

  const [globalContext, setGlobalContext] = useState<FedCMContext>(
    FedCMContext.SignIn
  );
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [autoTest, setAutoTest] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [testTimerId, setTestTimerId] = useState<NodeJS.Timeout | null>(null);

  // Save IdP configuration to localStorage
  const saveIdpToLocalStorage = useCallback((idp: FedCMConfig) => {
    if (!idp.name) return;

    // Save the IdP configuration
    localStorage.setItem(`${FEDCM_IDP_PREFIX}${idp.name}`, JSON.stringify(idp));

    // Update the list of IdP names
    const existingList = JSON.parse(
      localStorage.getItem(FEDCM_IDP_LIST_KEY) || '[]'
    );
    if (!existingList.includes(idp.name)) {
      existingList.push(idp.name);
      localStorage.setItem(FEDCM_IDP_LIST_KEY, JSON.stringify(existingList));
    }
  }, []);

  // Save global context to localStorage
  const saveGlobalContext = useCallback(() => {
    localStorage.setItem(FEDCM_GLOBAL_CONTEXT_KEY, globalContext);
  }, [globalContext]);

  // Save a specific IdP configuration
  const saveIdp = useCallback(
    (index: number) => {
      const idp = idps[index];
      saveIdpToLocalStorage(idp);
      saveGlobalContext();
    },
    [idps, saveGlobalContext, saveIdpToLocalStorage]
  );

  // Load configurations from localStorage
  const loadConfigurationsFromLocalStorage = () => {
    try {
      const idpList = JSON.parse(
        localStorage.getItem(FEDCM_IDP_LIST_KEY) || '[]'
      );

      if (idpList.length === 0) {
        // If no saved configurations, keep the default one
        return;
      }

      const loadedIdps: FedCMConfig[] = [];

      idpList.forEach((idpName: string) => {
        const idpData = localStorage.getItem(`${FEDCM_IDP_PREFIX}${idpName}`);
        if (idpData) {
          try {
            const parsedIdp = JSON.parse(idpData);
            loadedIdps.push(parsedIdp);
          } catch (e) {
            console.error(`Failed to parse IdP data for ${idpName}`, e);
          }
        }
      });

      if (loadedIdps.length > 0) {
        setIdps(loadedIdps);
      }

      // Load global context if available
      const savedContext = localStorage.getItem(FEDCM_GLOBAL_CONTEXT_KEY);
      if (savedContext) {
        setGlobalContext(savedContext as FedCMContext);
      }
    } catch (e) {
      console.error('Failed to load configurations from localStorage', e);
    }
  };

  const handleTest = useCallback(() => {
    // Filter out incomplete IdP configurations
    const validIdps = idps.filter(
      (idp) => idp.name && idp.configURL && idp.clientId && idp.nonce
    );

    if (validIdps.length === 0) {
      alert('Please fill out at least one complete IdP configuration');
      return;
    }

    // Save all valid IdPs to localStorage before testing
    validIdps.forEach((idp) => saveIdpToLocalStorage(idp));

    // Save global context
    saveGlobalContext();

    // Build query parameters with just the IdP names and global context
    const params = new URLSearchParams();
    validIdps.forEach((idp) => {
      params.append('idp', idp.name);
    });
    params.append('context', globalContext);

    // Navigate to the test URL
    router.push(`/rp/action?${params.toString()}`);
  }, [idps, globalContext, router, saveGlobalContext, saveIdpToLocalStorage]);

  const handleCancelTest = useCallback(() => {
    setCountdown(null);
  }, []);

  // Load configurations on initial render
  useEffect(() => {
    loadConfigurationsFromLocalStorage();
  }, []);

  // Generate and persist nonces
  useEffect(() => {
    setIdps((prevIdps) => {
      return prevIdps.map((idp) => {
        // Check if the idp already has a nonce
        if (idp.nonce) {
          return idp;
        }

        // Generate new nonce for this IdP
        const newNonce = generateNonce();
        return { ...idp, nonce: newNonce };
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

  const handleGenerateNewNonce = useCallback((index: number) => {
    const newNonce = generateNonce();

    setIdps((prevIdps) => {
      const updatedIdps = [...prevIdps];
      updatedIdps[index] = { ...updatedIdps[index], nonce: newNonce };
      return updatedIdps;
    });
  }, []);

  const updateIdpConfig = useCallback(
    (
      index: number,
      key: keyof FedCMConfig,
      value: string | boolean | FedCMContext
    ) => {
      setIdps((prevIdps) => {
        const updatedIdps = [...prevIdps];
        updatedIdps[index] = { ...updatedIdps[index], [key]: value };
        return updatedIdps;
      });
    },
    []
  );

  const addNewIdp = useCallback(() => {
    const newNonce = generateNonce();
    const newIdpName = `IdP ${idps.length + 1}`;

    setIdps((prevIdps) => [
      ...prevIdps,
      {
        name: newIdpName,
        configURL: '',
        clientId: '',
        nonce: newNonce,
        useLoginHint: false,
        loginHint: '',
      },
    ]);
  }, [idps.length]);

  const removeIdp = useCallback(
    (index: number) => {
      if (idps.length > 1) {
        // Get the IdP name to remove from localStorage
        const idpToRemove = idps[index];

        // Remove from localStorage
        localStorage.removeItem(`${FEDCM_IDP_PREFIX}${idpToRemove.name}`);

        // Update the list of IdP names
        const idpList = JSON.parse(
          localStorage.getItem(FEDCM_IDP_LIST_KEY) || '[]'
        );
        const updatedList = idpList.filter(
          (name: string) => name !== idpToRemove.name
        );
        localStorage.setItem(FEDCM_IDP_LIST_KEY, JSON.stringify(updatedList));

        // Update state
        setIdps((prevIdps) => prevIdps.filter((_, i) => i !== index));
      }
    },
    [idps]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Cancel any existing countdown
      if (testTimerId) {
        clearTimeout(testTimerId);
        setTestTimerId(null);
      }

      // Filter out incomplete IdP configurations
      const validIdps = idps.filter(
        (idp) => idp.name && idp.configURL && idp.clientId && idp.nonce
      );

      if (validIdps.length === 0) {
        alert('Please fill out at least one complete IdP configuration');
        return;
      }

      // Save all valid IdPs to localStorage
      validIdps.forEach((idp) => saveIdpToLocalStorage(idp));

      // Save global context
      saveGlobalContext();

      // Update state with only valid IdPs
      setIdps(validIdps);

      // Create the FedCM options object using all valid providers
      const providers = validIdps.map((idp) => {
        const provider: Record<string, string> = {
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
      const fedCmOptions = {
        identity: {
          context: globalContext,
          providers: providers,
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
      idps,
      testTimerId,
      globalContext,
      autoTest,
      saveIdpToLocalStorage,
      saveGlobalContext,
      setTestTimerId,
      setIdps,
      setJsonOutput,
      setCountdown,
    ]
  );

  // Function to add the MockFedCM IdP
  const addMockFedCMIdp = useCallback(() => {
    const protocol = isHttpsEnabled() ? 'https' : 'http';
    const baseUrl = process.env.NEXT_PUBLIC_APP_FQDN
      ? `${protocol}://${process.env.NEXT_PUBLIC_APP_FQDN}`
      : ''; // Fallback or error handling might be needed if FQDN is missing

    if (!baseUrl) {
      alert('Error: NEXT_PUBLIC_APP_FQDN environment variable is not set.');
      return;
    }

    const newNonce = generateNonce();
    const newClientId = generateClientId();
    const configURL = `${baseUrl}/api/fedcm/config.json`;

    const newIdp: FedCMConfig = {
      name: 'MockFedCM IdP', // Default name
      configURL: configURL,
      clientId: newClientId,
      nonce: newNonce,
      useLoginHint: false,
      loginHint: '',
    };

    setIdps((prevIdps) => [...prevIdps, newIdp]);
  }, []);

  return (
    <div className='w-full flex justify-center'>
      <div className='card w-full max-w-2xl bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title mb-6'>FedCM Configuration</h2>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='p-4 border rounded-lg'>
              <h3 className='font-medium text-center text-lg mb-4'>
                Global Settings
              </h3>
              <ContextSelect
                value={globalContext}
                onChange={(value) => setGlobalContext(value)}
              />
            </div>

            {/* Button to add MockFedCM IdP - Place it between Global Settings and the IdP list */}
            <div className='flex justify-center'>
              <Button
                type='button'
                onClick={addMockFedCMIdp}
                variant='ghost'
                className='gap-2'
              >
                {/* Optional: Add an icon */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-webhook'
                >
                  <path d='M18 16.98h-5.91a4 4 0 0 1-7.76-.81l-.3-1.68a4 4 0 0 1 .52-3.9l1.34-1.6A4 4 0 0 1 9.04 7c.52 0 1 .11 1.46.32l1.04.5a4 4 0 0 1 3.58 3.5l.5 1.03A4 4 0 0 1 18 16.98Z' />
                  <path d='M12 7V2l5 5' />
                  <path d='m7 19 5-5' />
                  <path d='m12 14 5 5' />
                </svg>
                Use MockFedCM IdP
              </Button>
            </div>

            {idps.map((idp, index) => (
              <div key={index} className='p-4 border rounded-lg space-y-6'>
                <h3 className='font-medium text-center text-lg'>
                  {idp.name || `FedCM IdP ${index + 1}`}
                </h3>

                <TextInput
                  label='IdP Name'
                  placeholder='Friendly name for this IdP'
                  value={idp.name}
                  onChange={(value) => updateIdpConfig(index, 'name', value)}
                  required
                />

                <TextInput
                  label='Config URL'
                  type='url'
                  placeholder='https://example.com/fedcm.json'
                  value={idp.configURL}
                  onChange={(value) =>
                    updateIdpConfig(index, 'configURL', value)
                  }
                  required
                />

                <TextInput
                  label='Client ID'
                  placeholder='your-client-id'
                  value={idp.clientId}
                  onChange={(value) =>
                    updateIdpConfig(index, 'clientId', value)
                  }
                  required
                />

                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Nonce</label>
                  <div className='join w-full'>
                    <input
                      type='text'
                      value={idp.nonce}
                      readOnly
                      className='input input-bordered join-item w-full bg-base-200'
                    />
                    <Button
                      type='button'
                      onClick={() => handleGenerateNewNonce(index)}
                      variant='ghost'
                      size='sm'
                      className='join-item'
                      title='Regenerate nonce'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' />
                        <path d='M21 3v5h-5' />
                        <path d='M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' />
                        <path d='M8 16H3v5' />
                      </svg>
                    </Button>
                  </div>
                </div>

                <ToggleInput
                  label='Use Login Hint'
                  checked={idp.useLoginHint}
                  onChange={(checked) =>
                    updateIdpConfig(index, 'useLoginHint', checked)
                  }
                />

                {idp.useLoginHint && (
                  <TextInput
                    placeholder='user@example.com'
                    value={idp.loginHint || ''}
                    onChange={(value) =>
                      updateIdpConfig(index, 'loginHint', value)
                    }
                  />
                )}

                <div className='flex justify-end gap-2 mt-4'>
                  <Button
                    type='button'
                    onClick={() => saveIdp(index)}
                    variant='ghost'
                    size='sm'
                    className='text-primary'
                    title='Save this IdP configuration'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='mr-1'
                    >
                      <path d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z'></path>
                      <polyline points='17 21 17 13 7 13 7 21'></polyline>
                      <polyline points='7 3 7 8 15 8'></polyline>
                    </svg>
                    Save
                  </Button>

                  {idps.length > 1 && (
                    <Button
                      type='button'
                      onClick={() => removeIdp(index)}
                      variant='ghost'
                      size='sm'
                      className='text-error'
                      title='Remove this IdP'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='mr-1'
                      >
                        <path d='M3 6h18'></path>
                        <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
                        <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
                      </svg>
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <div className='flex justify-center'>
              <Button
                type='button'
                onClick={addNewIdp}
                variant='ghost'
                className='gap-2'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M12 5v14'></path>
                  <path d='M5 12h14'></path>
                </svg>
                Add IdP
              </Button>
            </div>

            <ToggleInput
              label='Auto Test (automatically run test after 5 seconds)'
              checked={autoTest}
              onChange={(checked) => setAutoTest(checked)}
            />

            <div className='card-actions justify-end pt-4'>
              <Button type='submit' variant='primary'>
                Generate Configuration
              </Button>
            </div>
          </form>

          {jsonOutput && (
            <div className='mt-6'>
              <h3 className='card-title text-lg mb-2'>
                Generated Configuration
              </h3>
              <pre className='bg-base-200 p-4 rounded-lg overflow-x-auto'>
                <code>{jsonOutput}</code>
              </pre>
              <div className='card-actions justify-end mt-4'>
                {countdown !== null ? (
                  <>
                    <span className='text-sm self-center mr-2'>
                      Testing in {countdown}s...
                    </span>
                    <Button onClick={handleCancelTest} variant='ghost'>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleTest} variant='secondary'>
                    Test Configuration
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FedCMRPForm;
