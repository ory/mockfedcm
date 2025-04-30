"use client";

import RPAction from "../_components/rpAction";
import RPActionExplanation from "../_components/rpActionExplanation";

export default function RPActionPage() {
  return (
    <>
      <div className="w-full bg-white inline-flex flex-col justify-start items-center overflow-hidden">
        <div className="w-full max-w-[1536px] border-l border-r border-gray-300 flex flex-col justify-start items-start gap-12 overflow-hidden">
          <div className="self-stretch md:hidden px-4 py-8 bg-gray-50 border-b border-gray-300 flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-gray-900 text-2xl font-medium font-['Space_Grotesk'] leading-8">
              Test FedCM
            </div>
          </div>

          <div className="self-stretch inline-flex flex-col md:flex-row justify-start items-start w-full">
            <div className="w-full md:flex-1 md:order-2 px-4 md:px-8 inline-flex flex-col justify-start items-center gap-8 border-b md:border-b-0 md:border-l border-gray-300">
              <RPAction />
            </div>

            <div className="w-full md:flex-1 md:order-1 py-8 md:py-32 bg-gray-50 inline-flex flex-col justify-start items-center gap-4 border border-gray-300">
              <div className="hidden md:flex self-stretch flex-col justify-start items-start gap-16">
                <div className="self-stretch px-8 pb-12 border-b border-gray-300 flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch justify-start text-gray-900 text-3xl font-medium font-['Space_Grotesk'] leading-10">
                    Test FedCM
                  </div>
                </div>

                <div className="self-stretch pb-12 border-b border-gray-300 flex flex-col justify-start items-start gap-4">
                  <RPActionExplanation />
                </div>
              </div>

              <div className="md:hidden self-stretch flex flex-col justify-start items-start gap-8">
                <RPActionExplanation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
