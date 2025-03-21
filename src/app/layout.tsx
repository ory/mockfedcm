import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import Header from '@/components/ui/header';

// Initialize font
const inter = Inter({ subsets: ['latin'] });

// Define metadata for the page
export const metadata: Metadata = {
  title: 'FedCM Mock Site',
  description: 'A free FedCM RP & IdP for testing FedCM integrations.',
  authors: { name: 'Ory', url: 'https://ory.sh' },
};

// Layout Props interface
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const logoSrc = '/logo-ory.svg';

  const leftSideContent = (
    <div className='ml-2 space-x-4'>
      <Link href='https://github.com/ory/' className=''>
        Mock FedCM
      </Link>
    </div>
  );

  const rightSideContent = (
    <div className='flex items-center space-x-4'>
      <a
        href='https://ory.sh'
        className='btn btn-outline rounded-md transition-all duration-300 hover:shadow-lg'
        target='_blank'
        rel='noopener noreferrer'
      >
        Integrate FedCM with just a few lines of code
      </a>
      <span className='text-sm font-medium hidden md:inline-block'>
        Made with ❤️ by <strong>Ory</strong>
      </span>
    </div>
  );

  return (
    <html lang='en' data-theme='light'>
      <body className={inter.className}>
        <div className='min-h-screen flex flex-col'>
          <Header
            logoSrc={logoSrc}
            logoAlt='Company Logo'
            logoWidth={80}
            logoHeight={50}
            leftContent={leftSideContent}
            rightContent={rightSideContent}
            className='sticky top-0 z-30'
          />
          <main className='flex-grow pt-8 px-4 sm:px-6 lg:px-8'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
