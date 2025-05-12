"use client";

import React from "react";

interface HeaderProps {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  logo?: React.ReactNode;
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  className?: string;
}

const Header = ({
  leftContent,
  rightContent,
  logo,
  className,
}: HeaderProps) => {
  return (
    <header
      className={`w-full bg-black px-1 border-b border-fuchsia-500 inline-flex flex-col justify-start items-center overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1536px] h-full bg-black overflow-hidden flex flex-col justify-start items-center">
        <div className="w-full py-1.5 border-l border-r border-fuchsia-500 flex flex-col justify-start items-start gap-12">
          <div className="self-stretch px-8">
            {/* Large Screens Layout */}
            <div className="hidden lg:flex justify-between items-center space-x-8">
              <div className="flex-shrink-0">{logo}</div>
              <div className="flex-grow">{leftContent}</div>
              <div className="flex-shrink-0 transform">{rightContent}</div>
            </div>

            {/* Small Screens Layout */}
            <div className="flex lg:hidden flex-col">
              <div className="flex justify-between items-center">
                <div className="flex-shrink-0">{logo}</div>
                <div className="flex-shrink-0">{rightContent}</div>
              </div>
              <div className="w-full mt-4">{leftContent}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
