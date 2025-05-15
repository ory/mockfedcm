"use client";

import { Check, Copy } from "lucide-react";

interface CodeSnippetProps {
  title?: string;
  label?: string;
  copied?: boolean;
  handleCopy?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  codeSnippet?: object | null;
  defaultMessage?: string;
}

const CodeSnippet = ({
  title,
  label,
  copied,
  handleCopy,
  codeSnippet,
  defaultMessage,
}: CodeSnippetProps) => {
  return (
    <div className="self-stretch inline-flex flex-col justify-start items-start gap-8">
      <div className="self-stretch inline-flex flex-col justify-start items-start gap-4">
        <div className="justify-start text-gray-900 text-base font-medium font-['Space_Grotesk'] leading-none">
          {title}
        </div>
      </div>
      <div className="self-stretch px-4 pt-4 pb-6 bg-gray-50 rounded-lg outline-1 outline-offset-[-1px] outline-gray-100 inline-flex flex-col justify-start items-start gap-6">
        <div className="self-stretch inline-flex justify-start items-center gap-4">
          <div className="flex-1 justify-start text-gray-400 text-base font-normal font-['JetBrains_Mono'] leading-relaxed">
            {label}
          </div>
          <div data-state="Default" className="w-5 h-5 relative">
            <div className="w-5 h-5 left-0 top-0 absolute overflow-hidden">
              <div
                className="w-4 h-4 relative overflow-hidden cursor-pointer"
                onClick={handleCopy}
                title={copied ? "Copied!" : "Copy to clipboard"}
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 left-[3.33px] top-[3.33px] text-fuchsia-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5 left-[3.33px] top-[3.33px] text-fuchsia-500" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-base-200 p-4 rounded-lg">
          <pre className="overflow-x-auto text-sm font-normal font-['JetBrains_Mono'] leading-relaxed">
            {codeSnippet
              ? JSON.stringify(codeSnippet, null, 2)
              : defaultMessage}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippet;
