import React from "react";

export default function RPActionExplanation() {
  return (
    <div className="self-stretch py-32 bg-gray-50 border-r border-gray-300 inline-flex flex-col justify-start items-center gap-4">
      <div className="self-stretch flex flex-col justify-start items-start gap-16">
        <div className="self-stretch px-8 pb-12 border-b border-gray-300 flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-start text-gray-900 text-2xl font-normal font-['Space_Grotesk'] leading-7">
            What is this?
          </div>
          <div className="self-stretch justify-start">
            <span className="text-gray-900 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
              This is a mock implementation of a{" "}
            </span>
            <span className="text-fuchsia-500 text-base font-semibold font-['Schibsted_Grotesk'] underline leading-normal">
              FedCM (Federated Credential Management)
            </span>
            <span className="text-gray-900 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
              {" "}
              Relying Party that you can use for testing and development
              purposes. FedCM is a web standard that enables federated identity
              without third-party cookies.
            </span>
          </div>
        </div>
        <div className="self-stretch px-8 pb-12 border-b border-gray-300 flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-start text-gray-900 text-2xl font-normal font-['Space_Grotesk'] leading-7">
            How it works
          </div>
          <div className="self-stretch justify-start text-gray-900 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
            The testing interface simulates a Relying Party (RP) that uses FedCM
            to authenticate users. Here’s what happens:
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <div
              data-hasdescription-2="false"
              data-hasdescription-3="false"
              className="self-stretch inline-flex justify-start items-start gap-4"
            >
              <div className="pt-1 flex justify-start items-center gap-4">
                <div className="w-4 h-4 bg-fuchsia-500 rounded-[999px] inline-flex flex-col justify-center items-center">
                  <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">
                    1
                  </div>
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                  Configuration Check
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                    The interface first checks if your browser supports the
                    FedCM API.
                  </div>
                </div>
              </div>
            </div>
            <div
              data-hasdescription-2="false"
              data-hasdescription-3="false"
              className="self-stretch inline-flex justify-start items-start gap-4"
            >
              <div className="pt-1 flex justify-start items-center gap-4">
                <div className="w-4 h-4 bg-fuchsia-500 rounded-[999px] inline-flex flex-col justify-center items-center">
                  <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">
                    2
                  </div>
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                  {" "}
                  IdP Configuration
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                    It fetches the configuration from your IdP using the
                    provided configURL.
                  </div>
                </div>
              </div>
            </div>
            <div
              data-hasdescription-2="false"
              data-hasdescription-3="false"
              className="self-stretch inline-flex justify-start items-start gap-4"
            >
              <div className="pt-1 flex justify-start items-center gap-4">
                <div className="w-4 h-4 bg-fuchsia-500 rounded-[999px] inline-flex flex-col justify-center items-center">
                  <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">
                    3
                  </div>
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                  Authentication Flow
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                    When ready, it initiates the FedCM authentication flow using
                    the configured parameters.
                  </div>
                </div>
              </div>
            </div>
            <div
              data-hasdescription-2="false"
              data-hasdescription-3="false"
              className="self-stretch inline-flex justify-start items-start gap-4"
            >
              <div className="pt-1 flex justify-start items-center gap-4">
                <div className="w-4 h-4 bg-fuchsia-500 rounded-[999px] inline-flex flex-col justify-center items-center">
                  <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">
                    4
                  </div>
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-black text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                  Response Handling
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                    The interface displays the results of the authentication
                    attempt, including any errors or successful responses.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch px-8 pb-12 border-b border-gray-300 flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-start text-gray-900 text-2xl font-normal font-['Space_Grotesk'] leading-7">
            Required Configuration Parameters
          </div>
          <div className="self-stretch justify-start text-gray-900 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
            These settings are required for your app to interact with the
            identity provider during authentication, allowing you to test
            various FedCM scenarios.
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <div
              data-hasdescription-2="false"
              data-hasdescription-3="false"
              className="self-stretch inline-flex justify-start items-start gap-4"
            >
              <div className="pt-1 flex justify-start items-center gap-4">
                <div className="w-4 h-4 bg-fuchsia-500 rounded-[999px] inline-flex flex-col justify-center items-center">
                  <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">
                    {">"}
                  </div>
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                  Config URL
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                    The URL pointing to your FedCM configuration JSON file. This
                    URL should be publicly accessible and contain your identity
                    provider configuration.
                  </div>
                </div>
              </div>
            </div>
            <div
              data-hasdescription-2="false"
              data-hasdescription-3="false"
              className="self-stretch inline-flex justify-start items-start gap-4"
            >
              <div className="pt-1 flex justify-start items-center gap-4">
                <div className="w-4 h-4 bg-fuchsia-500 rounded-[999px] inline-flex flex-col justify-center items-center">
                  <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">
                    {">"}
                  </div>
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                  Client ID
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                    A unique identifier that your identity provider has assigned
                    to your application. This is used to identify your
                    application when making authentication requests.
                  </div>
                </div>
              </div>
            </div>
            <div
              data-hasdescription-2="false"
              data-hasdescription-3="false"
              className="self-stretch inline-flex justify-start items-start gap-4"
            >
              <div className="pt-1 flex justify-start items-center gap-4">
                <div className="w-4 h-4 bg-fuchsia-500 rounded-[999px] inline-flex flex-col justify-center items-center">
                  <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">
                    {">"}
                  </div>
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                  Nonce
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                    A unique, random string used to prevent replay attacks. Each
                    authentication request should use a new nonce. You can
                    generate a new UUID v4 nonce by clicking the
                    &apos;Regenerate&apos; button.
                  </div>
                </div>
              </div>
            </div>
            <div
              data-hasdescription-2="true"
              data-hasdescription-3="false"
              className="self-stretch inline-flex justify-start items-start gap-4"
            >
              <div className="pt-1 flex justify-start items-center gap-4">
                <div className="w-4 h-4 bg-fuchsia-500 rounded-[999px] inline-flex flex-col justify-center items-center">
                  <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">
                    {">"}
                  </div>
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                  Context
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                    The context in which the authentication request is being
                    made. This helps the identity provider customize the user
                    experience.
                  </div>
                  <div className="self-stretch opacity-75 justify-start">
                    <span className="text-gray-800 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                      Continue
                    </span>
                    <span className="text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                      : Continue with an existing session
                      <br />
                    </span>
                    <span className="text-gray-800 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                      Sign In
                    </span>
                    <span className="text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                      : Sign in to an existing account
                      <br />
                    </span>
                    <span className="text-gray-800 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                      Sign Up
                    </span>
                    <span className="text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                      : Create a new account
                      <br />
                    </span>
                    <span className="text-gray-800 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                      Use
                    </span>
                    <span className="text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                      : Use an identity without creating a session
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-hasdescription-2="false"
              data-hasdescription-3="false"
              className="self-stretch inline-flex justify-start items-start gap-4"
            >
              <div className="pt-1 flex justify-start items-center gap-4">
                <div className="w-4 h-4 bg-fuchsia-500 rounded-[999px] inline-flex flex-col justify-center items-center">
                  <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">
                    {">"}
                  </div>
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                  Login Hint
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                    An optional hint about which account the user wishes to
                    authenticate with. When enabled, you can provide an
                    identifier (usually an email address) that helps pre-select
                    the user&apos;s account.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch px-8 pb-12 border-b border-gray-300 flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-start text-gray-900 text-2xl font-normal font-['Space_Grotesk'] leading-7">
            Testing Scenarios
          </div>
          <div className="self-stretch justify-start text-gray-900 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
            You can test various FedCM scenarios using this interface
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <div
              data-hasdescription-2="false"
              data-hasdescription-3="false"
              className="self-stretch inline-flex justify-start items-start gap-4"
            >
              <div className="pt-1 flex justify-start items-center gap-4">
                <div className="w-4 h-4 bg-fuchsia-500 rounded-[999px] inline-flex flex-col justify-center items-center">
                  <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">
                    {">"}
                  </div>
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                  Successful Authentication
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                    When the user is already signed in to the IdP.
                  </div>
                </div>
              </div>
            </div>
            <div
              data-hasdescription-2="false"
              data-hasdescription-3="false"
              className="self-stretch inline-flex justify-start items-start gap-4"
            >
              <div className="pt-1 flex justify-start items-center gap-4">
                <div className="w-4 h-4 bg-fuchsia-500 rounded-[999px] inline-flex flex-col justify-center items-center">
                  <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">
                    {">"}
                  </div>
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                  Authentication Required
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                    When the user needs to sign in to the IdP first.
                  </div>
                </div>
              </div>
            </div>
            <div
              data-hasdescription-2="false"
              data-hasdescription-3="false"
              className="self-stretch inline-flex justify-start items-start gap-4"
            >
              <div className="pt-1 flex justify-start items-center gap-4">
                <div className="w-4 h-4 bg-fuchsia-500 rounded-[999px] inline-flex flex-col justify-center items-center">
                  <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">
                    {">"}
                  </div>
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-black text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                  Error Cases
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                    When there are issues with the configuration or
                    authentication process.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch px-8 flex flex-col justify-start items-start gap-2">
          <div
            data-hasp2="false"
            data-hasp3="false"
            className="self-stretch px-4 pt-4 pb-6 bg-cyan-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-cyan-500 flex flex-col justify-start items-start gap-3"
          >
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div
                  data-status="Info"
                  className="px-3 py-1.5 bg-cyan-400 rounded flex justify-center items-center gap-2.5"
                >
                  <div className="justify-start text-cyan-950 text-sm font-normal font-['Inter'] leading-none tracking-tight">
                    Info
                  </div>
                </div>
                <div className="w-[532px] justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                  Browser support
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-center items-center gap-2">
                <div className="self-stretch opacity-75 justify-start text-gray-900 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
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
    // <div className='min-h-screen bg-base-200 p-8'>
    //   <div className='max-w-4xl mx-auto'>
    //     <div className='card bg-base-100 shadow-xl mb-8'>
    //       <div className='card-body'>
    //         <h2 className='card-title'>Testing FedCM Integration</h2>
    //         <p className='mb-4'>
    //           This page provides a testing interface for FedCM (Federated
    //           Credential Management) integration. It allows you to test the
    //           FedCM authentication flow with your configured Identity Provider
    //           (IdP).
    //         </p>

    //         <h3 className='text-xl font-semibold mt-4 mb-2'>How It Works</h3>
    //         <p className='mb-2'>
    //           The testing interface simulates a Relying Party (RP) that uses
    //           FedCM to authenticate users. Here&apos;s what happens:
    //         </p>

    //         <div className='space-y-4 mb-6'>
    //           <div>
    //             <h4 className='font-medium mb-2'>1. Configuration Check</h4>
    //             <p>
    //               The interface first checks if your browser supports the FedCM
    //               API.
    //             </p>
    //           </div>
    //           <div>
    //             <h4 className='font-medium mb-2'>2. IdP Configuration</h4>
    //             <p>
    //               It fetches the configuration from your IdP using the provided
    //               configURL.
    //             </p>
    //           </div>
    //           <div>
    //             <h4 className='font-medium mb-2'>3. Authentication Flow</h4>
    //             <p>
    //               When ready, it initiates the FedCM authentication flow using
    //               the configured parameters.
    //             </p>
    //           </div>
    //           <div>
    //             <h4 className='font-medium mb-2'>4. Response Handling</h4>
    //             <p>
    //               The interface displays the results of the authentication
    //               attempt, including any errors or successful responses.
    //             </p>
    //           </div>
    //         </div>

    //         <h3 className='text-xl font-semibold mt-4 mb-2'>
    //           Required Parameters
    //         </h3>
    //         <div className='space-y-4 mb-6'>
    //           <div>
    //             <h4 className='font-medium mb-2'>configURL</h4>
    //             <p>The URL of your IdP&apos;s configuration endpoint.</p>
    //           </div>
    //           <div>
    //             <h4 className='font-medium mb-2'>clientId</h4>
    //             <p>Your RP&apos;s client ID as registered with the IdP.</p>
    //           </div>
    //         </div>

    //         <h3 className='text-xl font-semibold mt-4 mb-2'>
    //           Optional Parameters
    //         </h3>
    //         <div className='space-y-4 mb-6'>
    //           <div>
    //             <h4 className='font-medium mb-2'>nonce</h4>
    //             <p>A unique value to prevent replay attacks.</p>
    //           </div>
    //           <div>
    //             <h4 className='font-medium mb-2'>loginHint</h4>
    //             <p>A hint to help the IdP identify the user.</p>
    //           </div>
    //           <div>
    //             <h4 className='font-medium mb-2'>context</h4>
    //             <p>Additional context for the authentication request.</p>
    //           </div>
    //         </div>

    //         <h3 className='text-xl font-semibold mt-4 mb-2'>
    //           Testing Scenarios
    //         </h3>
    //         <p className='mb-2'>
    //           You can test various scenarios using this interface:
    //         </p>

    //         <div className='space-y-4 mb-6'>
    //           <div>
    //             <h4 className='font-medium mb-2'>Successful Authentication</h4>
    //             <p>When the user is already signed in to the IdP.</p>
    //           </div>
    //           <div>
    //             <h4 className='font-medium mb-2'>Authentication Required</h4>
    //             <p>When the user needs to sign in to the IdP first.</p>
    //           </div>
    //           <div>
    //             <h4 className='font-medium mb-2'>Error Cases</h4>
    //             <p>
    //               When there are issues with the configuration or authentication
    //               process.
    //             </p>
    //           </div>
    //         </div>

    //         <div className='alert alert-info mt-6'>
    //           <svg
    //             xmlns='http://www.w3.org/2000/svg'
    //             fill='none'
    //             viewBox='0 0 24 24'
    //             className='stroke-current shrink-0 w-6 h-6'
    //           >
    //             <path
    //               strokeLinecap='round'
    //               strokeLinejoin='round'
    //               strokeWidth='2'
    //               d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    //             ></path>
    //           </svg>
    //           <div>
    //             <h3 className='font-bold'>Browser Support</h3>
    //             <div className='text-sm'>
    //               FedCM is currently supported in Chrome and other
    //               Chromium-based browsers. Make sure you&apos;re using a
    //               supported browser for testing.
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
