import React from 'react';

export default function RPActionExplanation() {
  return (
    <div className='prose max-w-none'>
      <h2>Testing FedCM Integration</h2>
      <p>
        This page provides a testing interface for FedCM (Federated Credential
        Management) integration. It allows you to test the FedCM authentication
        flow with your configured Identity Provider (IdP).
      </p>

      <h3>How It Works</h3>
      <p>
        The testing interface simulates a Relying Party (RP) that uses FedCM to
        authenticate users. Here&apos;s what happens:
      </p>

      <ol>
        <li>
          <strong>Configuration Check:</strong> The interface first checks if
          your browser supports the FedCM API.
        </li>
        <li>
          <strong>IdP Configuration:</strong> It fetches the configuration from
          your IdP using the provided configURL.
        </li>
        <li>
          <strong>Authentication Flow:</strong> When ready, it initiates the
          FedCM authentication flow using the configured parameters.
        </li>
        <li>
          <strong>Response Handling:</strong> The interface displays the results
          of the authentication attempt, including any errors or successful
          responses.
        </li>
      </ol>

      <h3>Required Parameters</h3>
      <ul>
        <li>
          <strong>configURL:</strong> The URL of your IdP&apos;s configuration
          endpoint.
        </li>
        <li>
          <strong>clientId:</strong> Your RP&apos;s client ID as registered with
          the IdP.
        </li>
      </ul>

      <h3>Optional Parameters</h3>
      <ul>
        <li>
          <strong>nonce:</strong> A unique value to prevent replay attacks.
        </li>
        <li>
          <strong>loginHint:</strong> A hint to help the IdP identify the user.
        </li>
        <li>
          <strong>context:</strong> Additional context for the authentication
          request.
        </li>
      </ul>

      <h3>Testing Scenarios</h3>
      <p>You can test various scenarios using this interface:</p>

      <ul>
        <li>
          <strong>Successful Authentication:</strong> When the user is already
          signed in to the IdP.
        </li>
        <li>
          <strong>Authentication Required:</strong> When the user needs to sign
          in to the IdP first.
        </li>
        <li>
          <strong>Error Cases:</strong> When there are issues with the
          configuration or authentication process.
        </li>
      </ul>

      <div className='alert alert-info mt-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          className='stroke-current shrink-0 w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          ></path>
        </svg>
        <div>
          <h3 className='font-bold'>Browser Support</h3>
          <div className='text-sm'>
            FedCM is currently supported in Chrome and other Chromium-based
            browsers. Make sure you&apos;re using a supported browser for
            testing.
          </div>
        </div>
      </div>
    </div>
  );
}
