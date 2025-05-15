"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FedCMLinks() {
  return (
    <>
      <div className="self-stretch py-12 lg:py-32 inline-flex flex-col justify-center items-start gap-16">
        <div className="self-stretch flex flex-col justify-start items-start gap-8">
          <div className="self-stretch flex flex-col justify-start items-start gap-6">
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
    </>
  );
}
