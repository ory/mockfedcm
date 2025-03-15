'use client';

import React, { useCallback, useEffect, useState } from 'react';
import TextInput from '@/components/ui/textInput';
import CheckboxInput from '@/components/ui/checkbox';
import Button from '@/components/ui/button';
import ContextSelect, { FedCMContext } from './contextSelect';
import { generateNonce } from '@/utlis/generateNonce';
import { useRouter } from 'next/navigation';

export interface FedCMConfig {
  configURL: string;
  clientId: string;
  nonce: string;
  context: FedCMContext;
  useLoginHint: boolean;
  loginHint?: string;
}

const FedCMRPForm = () => {
  const router = useRouter();
  const [config, setConfig] = useState<FedCMConfig>({
    configURL: '',
    clientId: '',
    nonce: '',
    context: FedCMContext.SignIn,
    useLoginHint: false,
    loginHint: '',
  });

  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [autoTest, setAutoTest] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [testTimerId, setTestTimerId] = useState<NodeJS.Timeout | null>(null);

  const handleTest = useCallback(() => {
    // Build query parameters
    const params = new URLSearchParams();
    params.append('configURL', config.configURL);
    params.append('clientId', config.clientId);
    params.append('nonce', config.nonce);
    params.append('context', config.context);

    if (config.useLoginHint && config.loginHint) {
      params.append('loginHint', config.loginHint);
    }

    // Navigate to the test URL
    router.push(`/rp/action?${params.toString()}`);
  }, [config, router]);

  const handleCancelTest = () => {
    setCountdown(null);
  };

  // Generate and persist nonce
  useEffect(() => {
    // Check local storage first
    const storedNonce = localStorage.getItem('persistedNonce');

    if (storedNonce) {
      setConfig((prev) => ({ ...prev, nonce: storedNonce }));
    } else {
      // Generate new nonce and store it
      const newNonce = generateNonce();
      localStorage.setItem('persistedNonce', newNonce);
      setConfig((prev) => ({ ...prev, nonce: newNonce }));
    }
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

  const handleGenerateNewNonce = () => {
    const newNonce = generateNonce();
    localStorage.setItem('persistedNonce', newNonce);
    setConfig({ ...config, nonce: newNonce });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Cancel any existing countdown
    if (testTimerId) {
      clearTimeout(testTimerId);
      setTestTimerId(null);
    }

    // Create the FedCM options object
    const provider: Record<string, string> = {
      configURL: config.configURL,
      clientId: config.clientId,
      nonce: config.nonce,
      context: config.context,
    };

    // Only include login hint if it's enabled and has a value
    if (config.useLoginHint && config.loginHint) {
      provider.loginHint = config.loginHint;
    }

    // Format in the navigator.credentials.get structure
    const fedCmOptions = {
      identity: {
        context: config.context,
        providers: [provider],
      },
    };

    // Format the JSON output with pretty printing
    setJsonOutput(JSON.stringify(fedCmOptions, null, 2));

    // If auto test is enabled, navigate to the test URL
    if (autoTest) {
      setCountdown(5);
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-6'>FedCM Configuration</h2>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <TextInput
          label='Config URL'
          type='url'
          placeholder='https://example.com/fedcm.json'
          value={config.configURL}
          onChange={(value) => setConfig({ ...config, configURL: value })}
          required
        />

        <TextInput
          label='Client ID'
          placeholder='your-client-id'
          value={config.clientId}
          onChange={(value) => setConfig({ ...config, clientId: value })}
          required
        />

        <div className='space-y-2'>
          <TextInput label='Nonce' value={config.nonce} readOnly />
          <div className='flex justify-end'>
            <Button type='button' onClick={handleGenerateNewNonce}>
              Regenerate Nonce
            </Button>
          </div>
        </div>

        <ContextSelect
          value={config.context}
          onChange={(value) => setConfig({ ...config, context: value })}
        />

        <CheckboxInput
          label='Use Login Hint'
          checked={config.useLoginHint}
          onChange={(checked) =>
            setConfig({ ...config, useLoginHint: checked })
          }
        />

        {config.useLoginHint && (
          <TextInput
            placeholder='user@example.com'
            value={config.loginHint || ''}
            onChange={(value) => setConfig({ ...config, loginHint: value })}
          />
        )}

        <CheckboxInput
          label='Auto Test (automatically run test after 5 seconds)'
          checked={autoTest}
          onChange={(checked) => setAutoTest(checked)}
        />

        <div className='pt-4'>
          <Button type='submit' variant='primary'>
            Generate Configuration
          </Button>
        </div>
      </form>

      {jsonOutput && (
        <div className='mt-8'>
          <h3 className='text-xl font-semibold mb-2'>Configuration Output</h3>
          <div className='bg-base-300 p-4 rounded-lg'>
            <pre className='whitespace-pre-wrap'>{jsonOutput}</pre>
          </div>
          <div className='mt-4 flex justify-between items-center'>
            <p className='text-sm'>
              Use this configuration with the FedCM API to authenticate users
              through your identity provider.
            </p>
            <div className='flex gap-2 flex-shrink-0'>
              {countdown !== null && (
                <Button variant='ghost' onClick={handleCancelTest}>
                  Cancel ({countdown}s)
                </Button>
              )}
              <Button
                variant='accent'
                onClick={handleTest}
                disabled={countdown !== null}
              >
                {countdown !== null ? `Test in ${countdown}s...` : 'Test!'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FedCMRPForm;
