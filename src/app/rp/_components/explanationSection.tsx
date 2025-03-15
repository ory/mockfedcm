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
    <div className='prose max-w-none'>
      <h2>FedCM Relying Party Configuration</h2>
      <p>
        This form helps you configure the Federated Credential Management
        (FedCM) API for your website as a relying party. FedCM enables more
        private and secure federated identity flows directly in the browser.
      </p>

      <div className='my-8'>
        <h3>Configuration Parameters</h3>

        <div className='my-4'>
          <h4>Config URL</h4>
          <p>
            The URL pointing to your FedCM configuration JSON file. This URL
            should be publicly accessible and contain your identity provider
            configuration.
          </p>
        </div>

        <div className='my-4'>
          <h4>Client ID</h4>
          <p>
            A unique identifier that your identity provider has assigned to your
            application. This is used to identify your application when making
            authentication requests.
          </p>
        </div>

        <div className='my-4'>
          <h4>Nonce</h4>
          <p>
            A unique, random string used to prevent replay attacks. Each
            authentication request should use a new nonce. You can generate a
            new UUID v4 nonce by clicking the &apos;Regenerate&apos; button.
          </p>
        </div>

        <div className='my-4'>
          <h4>Context</h4>
          <p>
            The context in which the authentication request is being made. This
            helps the identity provider customize the user experience.
          </p>
          <ul>
            {contextOptions.map((option) => (
              <li key={option.id}>
                <strong>{option.label}</strong>: {option.description}
              </li>
            ))}
          </ul>
        </div>

        <div className='my-4'>
          <h4>Login Hint</h4>
          <p>
            An optional hint about which account the user wishes to authenticate
            with. When enabled, you can provide an identifier (usually an email
            address) that helps pre-select the user&apos;s account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExplanationSection;
