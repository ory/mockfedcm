import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="w-full bg-white inline-flex flex-col justify-start items-center overflow-hidden">
        <div className="w-full max-w-[1536px] border-l border-r border-gray-300 flex flex-col justify-start items-start gap-12 overflow-hidden">
          <div className="self-stretch md:hidden px-4 py-8 bg-gray-50 border-b border-gray-300 flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-gray-900 text-2xl font-medium font-['Space_Grotesk'] leading-8">
              Welcome to MockFedCM
            </div>
          </div>

          <div className="self-stretch inline-flex flex-col md:flex-row justify-start items-start w-full">
            <div className="w-full md:flex-1 md:order-2 px-4 md:px-8 inline-flex flex-col justify-start items-center gap-8 border-b md:border-b-0 md:border-l border-gray-300">
              <div className="self-stretch py-8 md:py-32 flex flex-col justify-center items-start gap-8">
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch flex flex-col justify-start items-start gap-4">
                    <Link
                      href="/rp"
                      className="self-stretch px-4 py-4 md:py-6 bg-white rounded-lg outline-1 outline-offset-[-1px] outline-fuchsia-500 inline-flex justify-start items-center gap-3"
                    >
                      <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch inline-flex justify-start items-center gap-2 flex-wrap content-center">
                          <div className="justify-start text-gray-900 text-sm md:text-base font-medium font-['Space_Grotesk'] leading-none">
                            Setup FedCM Relying Party (RP)
                          </div>
                        </div>
                        <div className="self-stretch flex flex-col justify-center items-center gap-2">
                          <div className="self-stretch opacity-75 justify-start text-gray-900 text-sm md:text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                            Configure your application to use FedCM
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-fuchsia-500" />
                    </Link>
                    <Link
                      href="/idp"
                      className="self-stretch px-4 py-4 md:py-6 bg-white rounded-lg outline outline-offset-[-1px] outline-fuchsia-500 inline-flex justify-start items-center gap-3"
                    >
                      <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch inline-flex justify-start items-center gap-2 flex-wrap content-center">
                          <div className="justify-start text-gray-900 text-sm md:text-base font-medium font-['Space_Grotesk'] leading-none">
                            Setup FedCM Identity Provider (IdP)
                          </div>
                        </div>
                        <div className="self-stretch flex flex-col justify-center items-center gap-2">
                          <div className="self-stretch opacity-75 justify-start text-gray-900 text-sm md:text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                            Configure your application to use FedCM
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-fuchsia-500" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:flex-1 md:order-1 py-8 md:py-32 bg-gray-50 inline-flex flex-col justify-start items-center gap-4 border border-gray-300">
              <div className="hidden md:flex self-stretch flex-col justify-start items-start gap-16">
                <div className="self-stretch px-8 pb-12 border-b border-gray-300 flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch justify-start text-gray-900 text-3xl font-medium font-['Space_Grotesk'] leading-10">
                    Welcome to MockFedCM
                  </div>
                </div>

                <div className="self-stretch px-8 pb-12 border-b border-gray-300 flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch justify-start text-gray-900 text-2xl font-normal font-['Space_Grotesk'] leading-7">
                    What is this?
                  </div>
                  <div className="self-stretch justify-start text-gray-900 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                    MockFedCM is a free FedCM Relying Party (RP) and Identity
                    Provider (IdP) for testing FedCM integrations. Easily
                    simulate real-world authentication flows, debug your
                    implementation, and validate user experiences—all without
                    needing a production IdP or RP.
                  </div>
                </div>

                <div className="self-stretch px-8 flex flex-col justify-start items-start gap-4">
                  <div
                    data-hasp2="false"
                    data-hasp3="false"
                    className="self-stretch px-4 pt-4 pb-6 bg-cyan-50 rounded-lg outline-1 outline-offset-[-1px] outline-cyan-500 flex flex-col justify-start items-start gap-3"
                  >
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                      <div className="self-stretch inline-flex justify-start items-center gap-2">
                        <div
                          data-status="Info"
                          className="px-3 py-1.5 bg-cyan-400 rounded flex justify-center items-center gap-2.5"
                        >
                          <div className="justify-start text-cyan-950 text-sm font-normal leading-none tracking-tight">
                            Info
                          </div>
                        </div>
                        <div className="justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
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
                  <div
                    data-hasp2="false"
                    data-hasp3="false"
                    className="self-stretch px-4 pt-4 pb-6 bg-yellow-50 rounded-lg outline-1 outline-offset-[-1px] outline-yellow-500 flex flex-col justify-start items-start gap-3"
                  >
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                      <div className="self-stretch inline-flex justify-start items-center gap-2">
                        <div
                          data-status="Warning"
                          className="px-3 py-1.5 bg-yellow-400 rounded flex justify-center items-center gap-2.5"
                        >
                          <div className="justify-start text-yellow-950 text-sm font-normal leading-none tracking-tight">
                            Warning
                          </div>
                        </div>
                        <div className="justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                          Don&apos;t use this in production
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col justify-center items-center gap-2">
                        <div className="self-stretch opacity-75 justify-start text-gray-900 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                          This site is for testing purposes only.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:hidden self-stretch flex flex-col justify-start items-start gap-8">
                <div className="self-stretch px-4 pb-8 border-b border-gray-300 flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch justify-start text-gray-900 text-xl font-normal font-['Space_Grotesk'] leading-6">
                    What is this?
                  </div>
                  <div className="self-stretch justify-start text-gray-900 text-sm font-normal font-['Schibsted_Grotesk'] leading-normal">
                    MockFedCM is a free FedCM Relying Party (RP) and Identity
                    Provider (IdP) for testing FedCM integrations. Easily
                    simulate real-world authentication flows, debug your
                    implementation, and validate user experiences—all without
                    needing a production IdP or RP.
                  </div>
                </div>

                <div className="self-stretch px-4 flex flex-col justify-start items-start gap-4">
                  <div
                    data-hasp2="false"
                    data-hasp3="false"
                    className="self-stretch px-3 pt-3 pb-4 bg-cyan-50 rounded-lg outline-1 outline-offset-[-1px] outline-cyan-500 flex flex-col justify-start items-start gap-2"
                  >
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                      <div className="self-stretch inline-flex justify-start items-center gap-2">
                        <div
                          data-status="Info"
                          className="px-2 py-1 bg-cyan-400 rounded flex justify-center items-center gap-2"
                        >
                          <div className="justify-start text-cyan-950 text-xs font-normal leading-none tracking-tight">
                            Info
                          </div>
                        </div>
                        <div className="justify-start text-gray-900 text-sm font-semibold font-['Schibsted_Grotesk'] leading-normal">
                          Browser support
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col justify-center items-center gap-2">
                        <div className="self-stretch opacity-75 justify-start text-gray-900 text-sm font-normal font-['Schibsted_Grotesk'] leading-normal">
                          FedCM is currently supported in Chrome and other
                          Chromium-based browsers. Make sure you&apos;re using a
                          supported browser for testing.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    data-hasp2="false"
                    data-hasp3="false"
                    className="self-stretch px-3 pt-3 pb-4 bg-yellow-50 rounded-lg outline-1 outline-offset-[-1px] outline-yellow-500 flex flex-col justify-start items-start gap-2"
                  >
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                      <div className="self-stretch inline-flex justify-start items-center gap-2">
                        <div
                          data-status="Warning"
                          className="px-2 py-1 bg-yellow-400 rounded flex justify-center items-center gap-2"
                        >
                          <div className="justify-start text-yellow-950 text-xs font-normal leading-none tracking-tight">
                            Warning
                          </div>
                        </div>
                        <div className="justify-start text-gray-900 text-sm font-semibold font-['Schibsted_Grotesk'] leading-normal">
                          Don&apos;t use this in production
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col justify-center items-center gap-2">
                        <div className="self-stretch opacity-75 justify-start text-gray-900 text-sm font-normal font-['Schibsted_Grotesk'] leading-normal">
                          This site is for testing purposes only.
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
    </>
  );
}
