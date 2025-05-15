"use client";

import React from "react";

interface GenericPageLayoutProps<
  FormProps = object,
  ExplanationProps = object,
> {
  formContent?: React.ComponentType<FormProps>;
  explanationContent?: React.ComponentType<ExplanationProps>;
  formContentProps?: FormProps;
  explanationContentProps?: ExplanationProps;
  title?: string;
  className?: string;
}

const GenericPageLayout = ({
  formContent: FormContent,
  explanationContent: ExplanationContent,
  title,
  className,
  formContentProps,
  explanationContentProps,
}: GenericPageLayoutProps) => {
  return (
    <div
      className={`w-full bg-white flex flex-col justify-start items-center overflow-hidden ${className}`}
    >
      <div className="w-full h-full max-w-[1536px] border-l border-r border-gray-300 flex flex-col justify-start items-start lg:gap-12 overflow-y-auto">
        <div className="self-stretch md:hidden px-4 py-8 bg-gray-50 border-b border-gray-300 flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-start text-gray-900 text-2xl font-medium font-['Space_Grotesk'] leading-8">
            {title}
          </div>
        </div>

        <div className="self-stretch flex-1 flex flex-col md:flex-row justify-start items-start w-full">
          <div className="w-full md:flex-1 md:order-2 h-full px-4 md:px-8 flex flex-col justify-start items-center gap-8 border-b md:border-b-0 border-gray-300">
            {FormContent && <FormContent {...formContentProps} />}
          </div>

          <div className="w-full md:flex-1 md:order-1 h-full py-8 md:py-32 bg-gray-50 flex flex-col justify-start items-center gap-4 border border-gray-300">
            <div className="hidden md:flex self-stretch flex-col justify-start items-start gap-16">
              <div className="self-stretch px-8 pb-12 border-b border-gray-300 flex flex-col justify-start items-start gap-4">
                <div className="self-stretch justify-start text-gray-900 text-3xl font-medium font-['Space_Grotesk'] leading-10">
                  {title}
                </div>
              </div>

              <div className="self-stretch px-8 pb-12 flex flex-col justify-start items-start gap-4">
                {ExplanationContent && (
                  <ExplanationContent {...explanationContentProps} />
                )}
              </div>
            </div>

            <div className="md:hidden self-stretch flex flex-col justify-start items-start gap-8">
              {ExplanationContent && (
                <ExplanationContent {...explanationContentProps} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericPageLayout;
