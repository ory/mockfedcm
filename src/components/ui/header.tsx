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
      className={`w-full bg-black px-1  border-b border-fuchsia-500 inline-flex flex-col justify-start items-center overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1536px] h-full bg-black overflow-hidden border-b border-fuchsia-500 flex flex-col justify-start items-center">
        <div className="w-full py-4 border-l border-r border-fuchsia-500 flex flex-col justify-start items-start gap-12">
          <div className="self-stretch px-8 flex justify-between items-start">
            <div className="flex-1 flex justify-start items-center gap-12 flex-wrap content-center">
              {logo}
              {leftContent}
            </div>
            <div className="flex-1 flex justify-end items-center gap-4">
              {rightContent}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
