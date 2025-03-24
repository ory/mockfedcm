'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/button';

function EndpointItem({ label, url }: { label: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium'>{label}</label>
      <div className='join w-full'>
        <input
          type='text'
          value={url}
          readOnly
          className='input input-bordered join-item w-full bg-base-200'
        />
        <Button
          onClick={handleCopy}
          variant='ghost'
          size='sm'
          className='join-item'
          title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          {copied ? (
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
              <path d='M20 6L9 17l-5-5' />
            </svg>
          ) : (
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
              <rect x='9' y='9' width='13' height='13' rx='2' ry='2' />
              <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
}

function EndpointsList() {
  const [endpoints, setEndpoints] = useState<{ label: string; url: string }[]>(
    []
  );

  useEffect(() => {
    // Get the base URL from environment variables
    const baseUrl = process.env.NEXT_PUBLIC_APP_FQDN
      ? `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${
          process.env.NEXT_PUBLIC_APP_FQDN
        }`
      : '';

    const getEndpointUrl = (path: string) => {
      return baseUrl ? `${baseUrl}${path}` : path;
    };

    setEndpoints([
      {
        label: 'IdP config',
        url: getEndpointUrl('/api/fedcm/config.json'),
      },
      {
        label: 'Discovery endpoint',
        url: getEndpointUrl('/.well-known/fedcm.json'),
      },
      {
        label: 'IdP manifest',
        url: getEndpointUrl('/api/fedcm/manifest'),
      },
      {
        label: 'User accounts endpoint',
        url: getEndpointUrl('/api/fedcm/accounts'),
      },
      {
        label: 'Client metadata endpoint',
        url: getEndpointUrl('/api/fedcm/client-metadata'),
      },
      {
        label: 'Token generation endpoint',
        url: getEndpointUrl('/api/fedcm/token'),
      },
    ]);
  }, []);

  return (
    <div className='space-y-4'>
      {endpoints.map((endpoint, index) => (
        <EndpointItem key={index} label={endpoint.label} url={endpoint.url} />
      ))}
    </div>
  );
}

export default function IdPExplanation() {
  return (
    <div className='min-h-screen bg-base-200 p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='card bg-base-100 shadow-xl mb-8'>
          <div className='card-body'>
            <h2 className='card-title'>What is this?</h2>
            <p className='mb-4'>
              This is a mock implementation of a FedCM (Federated Credential
              Management) Identity Provider that you can use for testing and
              development purposes. FedCM is a web standard that enables
              federated identity without third-party cookies.
            </p>

            <h3 className='text-xl font-semibold mt-4 mb-2'>How to use:</h3>
            <ol className='list-decimal list-inside space-y-2'>
              <li>Sign in with any username and password</li>
              <li>
                Your browser will receive a signed cookie that identifies you
              </li>
              <li>
                When a website uses this IdP via FedCM, you&apos;ll see two mock
                accounts to choose from
              </li>
              <li>
                Any client_id and any origin are accepted for testing purposes
              </li>
            </ol>

            <h3 className='text-xl font-semibold mt-4 mb-2'>
              FedCM Endpoints:
            </h3>
            <EndpointsList />
          </div>
        </div>
      </div>
    </div>
  );
}
