import type { Metadata } from "next";
import { Space_Grotesk, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/ui/header";

// Initialize fonts
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted-grotesk",
});

// Define metadata for the page
export const metadata: Metadata = {
  title: "FedCM Mock Site",
  description: "A free FedCM RP & IdP for testing FedCM integrations.",
  authors: { name: "Ory", url: "https://ory.sh" },
};

// Layout Props interface
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const logoSrc = "/Generic-Logo.svg";

  const leftSideContent = (
    <div className="flex-1 min-w-80 inline-flex flex-col justify-start items-start gap-2">
      <div className="pr-4 inline-flex justify-start items-center gap-4">
        <Link
          href="/idp"
          data-state="Default"
          className="pt-2 flex justify-center items-center gap-2"
        >
          <div className="justify-start text-white text-base font-normal font-['Schibsted_Grotesk'] leading-none whitespace-nowrap">
            Identity Provider
          </div>
        </Link>
        <Link
          href="/rp"
          data-state="Default"
          className="pt-2 flex justify-center items-center gap-2"
        >
          <div className="justify-start text-white text-base font-normal font-['Schibsted_Grotesk'] leading-none whitespace-nowrap">
            Relying Party
          </div>
        </Link>
        <Link
          href="/"
          data-state="Default"
          className="pt-2 flex justify-center items-center gap-2"
        >
          <div className="justify-start text-white text-base font-normal font-['Schibsted_Grotesk'] leading-none whitespace-nowrap">
            About
          </div>
        </Link>
      </div>
    </div>
  );

  const rightSideContent = (
    <div
      data-state="Default"
      className="px-4 py-3 bg-gray-900 rounded shadow-[-3px_4px_13.899999618530273px_0px_rgba(217,70,239,0.50)] outline outline-offset-[-1px] outline-fuchsia-500 flex justify-center items-center overflow-hidden"
    >
      <div className="min-h-4 flex justify-center items-center gap-3">
        <div className="justify-start text-white text-base font-normal font-['Schibsted_Grotesk'] leading-none">
          <a href="https://ory.sh">Integrate FedCM</a>
        </div>
      </div>
    </div>
  );

  const logo = (
    <div
      data-haswordmark="true"
      data-variant="Default"
      className="flex justify-start items-center gap-4"
    >
      <div className="w-10 h-10 relative bg-white rounded">
        <Link href="/" className="flex items-center absolute w-10 h-10">
          <Image
            src={logoSrc}
            alt={"Company Logo"}
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>
      </div>
      <div className="hidden md:block justify-start text-white text-3xl font-medium font-['Space_Grotesk'] leading-loose ">
        MockFedCM
      </div>
    </div>
  );

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${schibstedGrotesk.variable}`}
    >
      <body className="bg-white">
        <div className="flex flex-col border-b border-fuchsia-500 ">
          <Header
            logo={logo}
            leftContent={leftSideContent}
            rightContent={rightSideContent}
          />
          <main>
            <div className="px-1">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
