"use client";

export default function FedCMExplanation() {
  return (
    <>
      <div className="self-stretch py-12 bg-gray-50 inline-flex flex-col justify-start items-center gap-4 h-screen">
        <div className="self-stretch flex flex-col justify-start items-start gap-16">
          <div className="self-stretch px-5 pb-12 border-b border-gray-300 flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-gray-900 text-2xl font-normal font-['Space_Grotesk'] leading-7">
              What is this?
            </div>
            <div className="self-stretch justify-start text-gray-900 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
              MockFedCM is a free FedCM Relying Party (RP) and Identity Provider
              (IdP) for testing FedCM integrations. Easily simulate real-world
              authentication flows, debug your implementation, and validate user
              experiences—all without needing a production IdP or RP.
            </div>
          </div>
          <div className="self-stretch px-5 flex flex-col justify-start items-start gap-4">
            <div
              data-hasp2="false"
              data-hasp3="false"
              className="self-stretch px-4 pt-4 pb-6 bg-cyan-50 rounded-lg outline outline-offset-[-1px] outline-cyan-500 flex flex-col justify-start items-start gap-3"
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
            <div
              data-hasp2="false"
              data-hasp3="false"
              className="self-stretch px-4 pt-4 pb-6 bg-yellow-50 rounded-lg outline outline-offset-[-1px] outline-yellow-500 flex flex-col justify-start items-start gap-3"
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
                  <div className="w-[532px] justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                    Don’t use this in production
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
      </div>
    </>
  );
}
