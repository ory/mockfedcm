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
    <div className='card w-full bg-base-100'>
      <div className='card-body'>
        <h2 className='card-title mb-6'>FedCM Configuration</h2>

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

          <div className='card-actions justify-end pt-4'>
            <Button type='submit' variant='primary'>
              Generate Configuration
            </Button>
          </div>
        </form>

        {jsonOutput && (
          <div className='mt-6'>
            <h3 className='card-title text-lg mb-2'>Generated Configuration</h3>
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
  );
};

export default FedCMRPForm;
