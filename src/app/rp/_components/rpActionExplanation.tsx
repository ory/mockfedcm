import React from 'react';

export default function RPActionExplanation() {
  return (
    <div className='min-h-screen bg-base-200 p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='card bg-base-100 shadow-xl mb-8'>
          <div className='card-body'>
            <h2 className='card-title'>Testing FedCM Integration</h2>
            <p className='mb-4'>
              This page provides a testing interface for FedCM (Federated
              Credential Management) integration. It allows you to test the
              FedCM authentication flow with your configured Identity Provider
              (IdP).
            </p>

            <h3 className='text-xl font-semibold mt-4 mb-2'>How It Works</h3>
            <p className='mb-2'>
              The testing interface simulates a Relying Party (RP) that uses
              FedCM to authenticate users. Here&apos;s what happens:
            </p>

            <div className='space-y-4 mb-6'>
              <div>
                <h4 className='font-medium mb-2'>1. Configuration Check</h4>
                <p>
                  The interface first checks if your browser supports the FedCM
                  API.
                </p>
              </div>
              <div>
                <h4 className='font-medium mb-2'>2. IdP Configuration</h4>
                <p>
                  It fetches the configuration from your IdP using the provided
                  configURL.
                </p>
              </div>
              <div>
                <h4 className='font-medium mb-2'>3. Authentication Flow</h4>
                <p>
                  When ready, it initiates the FedCM authentication flow using
                  the configured parameters.
                </p>
              </div>
              <div>
                <h4 className='font-medium mb-2'>4. Response Handling</h4>
                <p>
                  The interface displays the results of the authentication
                  attempt, including any errors or successful responses.
                </p>
              </div>
            </div>

            <h3 className='text-xl font-semibold mt-4 mb-2'>
              Required Parameters
            </h3>
            <div className='space-y-4 mb-6'>
              <div>
                <h4 className='font-medium mb-2'>configURL</h4>
                <p>The URL of your IdP&apos;s configuration endpoint.</p>
              </div>
              <div>
                <h4 className='font-medium mb-2'>clientId</h4>
                <p>Your RP&apos;s client ID as registered with the IdP.</p>
              </div>
            </div>

            <h3 className='text-xl font-semibold mt-4 mb-2'>
              Optional Parameters
            </h3>
            <div className='space-y-4 mb-6'>
              <div>
                <h4 className='font-medium mb-2'>nonce</h4>
                <p>A unique value to prevent replay attacks.</p>
              </div>
              <div>
                <h4 className='font-medium mb-2'>loginHint</h4>
                <p>A hint to help the IdP identify the user.</p>
              </div>
              <div>
                <h4 className='font-medium mb-2'>context</h4>
                <p>Additional context for the authentication request.</p>
              </div>
            </div>

            <h3 className='text-xl font-semibold mt-4 mb-2'>
              Testing Scenarios
            </h3>
            <p className='mb-2'>
              You can test various scenarios using this interface:
            </p>

            <div className='space-y-4 mb-6'>
              <div>
                <h4 className='font-medium mb-2'>Successful Authentication</h4>
                <p>When the user is already signed in to the IdP.</p>
              </div>
              <div>
                <h4 className='font-medium mb-2'>Authentication Required</h4>
                <p>When the user needs to sign in to the IdP first.</p>
              </div>
              <div>
                <h4 className='font-medium mb-2'>Error Cases</h4>
                <p>
                  When there are issues with the configuration or authentication
                  process.
                </p>
              </div>
            </div>

            <div className='alert alert-info mt-6'>
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
                  FedCM is currently supported in Chrome and other
                  Chromium-based browsers. Make sure you&apos;re using a
                  supported browser for testing.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
