"use client";

import { useEffect, useState } from "react";
// import Button from "@/components/ui/button";

function EndpointItem({ label, url }: { label: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-hasicon="true"
      data-hasinput="True"
      data-haslabel="true"
      data-hastext="true"
      data-hastooltip="false"
      data-state="Default"
      className="self-stretch flex flex-col justify-start items-start gap-1"
    >
      <div className="self-stretch inline-flex justify-start items-center gap-8">
        <div className="flex-1 justify-start text-gray-900 text-sm font-medium leading-tight">
          {label}
        </div>
      </div>
      <div className="self-stretch p-3 bg-white rounded outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-2 overflow-hidden">
        <div className="flex-1 flex justify-start items-center">
          <div className="flex-1 justify-start text-gray-900 text-base font-normal leading-none">
            {url}
          </div>
        </div>
        <div
          className="w-4 h-4 relative overflow-hidden cursor-pointer"
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy to clipboard"}
        >
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <div className="w-2.5 h-2.5 left-[2.67px] top-[2.67px] absolute outline outline-1 outline-offset-[-0.50px] outline-gray-900" />
          )}
        </div>
      </div>
    </div>
  );
}

function EndpointsList() {
  const [endpoints, setEndpoints] = useState<{ label: string; url: string }[]>(
    [],
  );

  useEffect(() => {
    // Get the base URL from environment variables
    const baseUrl = process.env.NEXT_PUBLIC_APP_FQDN
      ? `${process.env.NODE_ENV === "production" ? "https" : "https"}://${
          process.env.NEXT_PUBLIC_APP_FQDN
        }`
      : "";

    const getEndpointUrl = (path: string) => {
      return baseUrl ? `${baseUrl}${path}` : path;
    };

    setEndpoints([
      {
        label: "IdP config",
        url: getEndpointUrl("/api/fedcm/config.json"),
      },
      {
        label: "Discovery endpoint",
        url: getEndpointUrl("/.well-known/fedcm.json"),
      },
      {
        label: "IdP manifest",
        url: getEndpointUrl("/api/fedcm/manifest"),
      },
      {
        label: "User accounts endpoint",
        url: getEndpointUrl("/api/fedcm/accounts"),
      },
      {
        label: "Client metadata endpoint",
        url: getEndpointUrl("/api/fedcm/client-metadata"),
      },
      {
        label: "Token generation endpoint",
        url: getEndpointUrl("/api/fedcm/token"),
      },
    ]);
  }, []);

  return (
    <>
      <div className="self-stretch flex flex-col justify-start items-start gap-8">
        {endpoints.map((endpoint, index) => (
          <EndpointItem key={index} label={endpoint.label} url={endpoint.url} />
        ))}
      </div>
    </>
  );
}

export default function IdPExplanation() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="card mb-8">
            <div className="card-body gap-16">
              <div className="self-stretch px-8 pb-12 border-b border-gray-300 inline-flex flex-col justify-start items-start gap-4">
                <div className="self-stretch justify-start text-gray-900 text-2xl font-normal font-['Space_Grotesk'] leading-7">
                  What is this?
                </div>
                <div className="self-stretch justify-start text-gray-900 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                  This is a mock implementation of a FedCM (Federated Credential
                  Management) Identity Provider that you can use for testing and
                  development purposes. FedCM is a web standard that enables
                  federated identity without third-party cookies.
                </div>
              </div>

              <div className="self-stretch px-8 pb-12 border-b border-gray-300 inline-flex flex-col justify-start items-start gap-8">
                <div className="self-stretch justify-start text-gray-900 text-2xl font-normal font-['Space_Grotesk'] leading-7">
                  How to use?
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
                          1{" "}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                      <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                        Sign in with email and password
                      </div>
                      <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                          Any email and password work.
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
                          2{" "}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                      <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                        Set a valid cookie
                      </div>
                      <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                          Your browser will receive a signed cookie that
                          identifies you.
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
                          3{" "}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                      <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                        Use this Identity Provider via FedCM
                      </div>
                      <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                          When a website uses this IdP via FedCM, you&apos;ll
                          see two mock accounts to choose from.
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
                      <div className="self-stretch justify-start text-gray-900 text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                        Test the Connection
                      </div>
                      <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch opacity-75 justify-start text-gray-800 text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                          Any client_id and any origin are accepted for testing
                          purposes.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch px-8 pb-12 border-gray-300 inline-flex flex-col justify-start items-start gap-8">
                <div className="self-stretch justify-start text-gray-900 text-2xl font-normal font-['Space_Grotesk'] leading-7">
                  FedCM Endpoints
                </div>
                <EndpointsList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
