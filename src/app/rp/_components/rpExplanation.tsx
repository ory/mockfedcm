import React from 'react';
import { FedCMContext } from './contextSelect';

interface ContextOptionWithKey {
  id: string;
  value: FedCMContext;
  label: string;
  description: string;
}

const ExplanationSection = () => {
  const contextOptions: ContextOptionWithKey[] = [
    {
      id: 'context-continue',
      value: FedCMContext.Continue,
      label: 'Continue',
      description: 'Continue with an existing session',
    },
    {
      id: 'context-signin',
      value: FedCMContext.SignIn,
      label: 'Sign In',
      description: 'Sign in to an existing account',
    },
    {
      id: 'context-signup',
      value: FedCMContext.SignUp,
      label: 'Sign Up',
      description: 'Create a new account',
    },
    {
      id: 'context-use',
      value: FedCMContext.Use,
      label: 'Use',
      description: 'Use an identity without creating a session',
    },
  ];

  return (
    <div className='min-h-screen bg-base-200 p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='card bg-base-100 shadow-xl mb-8'>
          <div className='card-body'>
            <h2 className='card-title'>What is this?</h2>
            <p className='mb-4'>
              This is a mock implementation of a FedCM (Federated Credential
              Management) Relying Party that you can use for testing and
              development purposes. FedCM is a web standard that enables
              federated identity without third-party cookies.
            </p>

            <h3 className='text-xl font-semibold mt-4 mb-2'>
              Configuration Parameters:
            </h3>

            <div className='space-y-6'>
              <div>
                <h4 className='font-medium mb-2'>Config URL</h4>
                <p>
                  The URL pointing to your FedCM configuration JSON file. This
                  URL should be publicly accessible and contain your identity
                  provider configuration.
                </p>
              </div>

              <div>
                <h4 className='font-medium mb-2'>Client ID</h4>
                <p>
                  A unique identifier that your identity provider has assigned
                  to your application. This is used to identify your application
                  when making authentication requests.
                </p>
              </div>

              <div>
                <h4 className='font-medium mb-2'>Nonce</h4>
                <p>
                  A unique, random string used to prevent replay attacks. Each
                  authentication request should use a new nonce. You can
                  generate a new UUID v4 nonce by clicking the
                  &apos;Regenerate&apos; button.
                </p>
              </div>

              <div>
                <h4 className='font-medium mb-2'>Context</h4>
                <p className='mb-2'>
                  The context in which the authentication request is being made.
                  This helps the identity provider customize the user
                  experience.
                </p>
                <ul className='list-disc list-inside space-y-1'>
                  {contextOptions.map((option) => (
                    <li key={option.id}>
                      <span className='font-medium'>{option.label}</span>:{' '}
                      {option.description}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className='font-medium mb-2'>Login Hint</h4>
                <p>
                  An optional hint about which account the user wishes to
                  authenticate with. When enabled, you can provide an identifier
                  (usually an email address) that helps pre-select the
                  user&apos;s account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationSection;
