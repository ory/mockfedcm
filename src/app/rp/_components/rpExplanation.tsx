import React from "react";
import { FedCMContext } from "./contextSelect";

interface ContextOptionWithKey {
  id: string;
  value: FedCMContext;
  label: string;
  description: string;
}

const ExplanationSection = () => {
  const contextOptions: ContextOptionWithKey[] = [
    {
      id: "context-continue",
      value: FedCMContext.Continue,
      label: "Continue",
      description: "Continue with an existing session",
    },
    {
      id: "context-signin",
      value: FedCMContext.SignIn,
      label: "Sign In",
      description: "Sign in to an existing account",
    },
    {
      id: "context-signup",
      value: FedCMContext.SignUp,
      label: "Sign Up",
      description: "Create a new account",
    },
    {
      id: "context-use",
      value: FedCMContext.Use,
      label: "Use",
      description: "Use an identity without creating a session",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl">
        <div className="card mb-8">
          <div className="card-body gap-16">
            <div className="self-stretch h-40 px-8 pb-12 border-b border-gray-300 inline-flex flex-col justify-start items-start gap-4">
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
                  purposes. FedCM is a web standard that enables federated
                  identity without third-party cookies.
                </span>
              </div>
            </div>

            <div className="self-stretch px-8 pb-12 border-b border-gray-300 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch justify-start text-gray-900 text-2xl font-normal font-['Space_Grotesk'] leading-7">
                Configuration Parameters
              </div>
              <div className="self-stretch justify-start text-gray-900 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                These settings define how your app interacts with the identity
                provider during authentication, allowing you to test various
                FedCM scenarios.
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-4">
                <div
                  data-hasdescription-2="false"
                  data-hasdescription-3="false"
                  className="self-stretch inline-flex justify-start items-start gap-4"
                >
                  <div className="pt-1 flex justify-start items-center gap-4">
                    <div className="w-4 h-4 bg-fuchsia-500 rounded-[999px] inline-flex flex-col justify-center items-center">
                      <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">{">"}</div>
                    </div>
                  </div>
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                    <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                      Config URL
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                      <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                        The URL pointing to your FedCM configuration JSON file.
                        This URL should be publicly accessible and contain your
                        identity provider configuration.
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
                      <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">{">"}</div>
                    </div>
                  </div>
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                    <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                      Client ID
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                      <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                        A unique identifier that your identity provider has
                        assigned to your application. This is used to identify
                        your application when making authentication requests.
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
                      <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">{">"}</div>
                    </div>
                  </div>
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                    <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                      Nonce
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                      <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                        A unique, random string used to prevent replay attacks.
                        Each authentication request should use a new nonce. You
                        can generate a new UUID v4 nonce by clicking the
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
                      <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">{">"}</div>
                    </div>
                  </div>
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                    <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                      Context
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                      <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                        The context in which the authentication request is being
                        made. This helps the identity provider customize the
                        user experience.
                      </div>
                      <div className="self-stretch opacity-75 justify-start">
                        {contextOptions.map((option) => (
                          <>
                            <span className="text-gray-800 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                              {option.label}
                            </span>
                            <span className="text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                              : {option.description}
                              <br />
                            </span>
                          </>
                        ))}
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
                      <div className="self-stretch text-center justify-start text-white text-xs font-medium font-['Schibsted_Grotesk'] leading-3">{">"}</div>
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
                        identifier (usually an email address) that helps
                        pre-select the user&apos;s account.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationSection;
