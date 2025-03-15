'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ActionPage = () => {
  const searchParams = useSearchParams();
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const paramsObject: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      paramsObject[key] = value;
    });

    setParams(paramsObject);
  }, [searchParams]);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='card bg-base-200'>
        <div className='card-body'>
          <h2 className='card-title text-2xl mb-6'>FedCM Test Action</h2>

          <div>
            <h3 className='text-xl font-semibold mb-2'>Received Parameters</h3>
            <div className='bg-base-300 p-4 rounded-lg'>
              <pre className='whitespace-pre-wrap'>
                {JSON.stringify(params, null, 2)}
              </pre>
            </div>
          </div>

          <div className='mt-6'>
            <h3 className='text-xl font-semibold mb-2'>
              Implementation Example
            </h3>
            <div className='bg-base-300 p-4 rounded-lg'>
              <pre className='whitespace-pre-wrap'>{`// Example usage of the FedCM API with these parameters
navigator.credentials.get({
  identity: {
    context: "${params.context || ''}",
    providers: [
      {
        configURL: "${params.configURL || ''}",
        clientId: "${params.clientId || ''}",
        nonce: "${params.nonce || ''}"${
                params.loginHint
                  ? `,
        loginHint: "${params.loginHint}"`
                  : ''
              }
      }
    ]
  }
})
.then((credential) => {
  // Handle the credential
  console.log('FedCM credential:', credential);
})
.catch((error) => {
  // Handle errors
  console.error('FedCM error:', error);
});`}</pre>
            </div>
            <p className='mt-4'>
              This page demonstrates that the query parameters were successfully
              passed from the form. In a real implementation, you would use code
              similar to the example above.
            </p>
          </div>

          <div className='card-actions justify-end mt-4'>
            <Link href='/' className='btn btn-primary'>
              Back to Configuration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPage;
