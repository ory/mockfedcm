'use client';

import cn from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  mobileBreakpoint?: 'sm' | 'md' | 'lg';
  className?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoHref?: string;
}

const Header = ({
  leftContent,
  rightContent,
  className,
  logoSrc,
  logoAlt = 'Ory Logo',
  logoWidth = 80,
  logoHeight = 40,
  logoHref = '/',
}: HeaderProps) => {
  return (
    <header className={cn('bg-base-100 shadow-md w-full', className)}>
      <div className='container mx-auto px-4'>
        <div className='navbar p-0 min-h-16'>
          {/* Left Side with Logo and Content */}
          <div className='navbar-start flex items-center flex-wrap'>
            {logoSrc && (
              <Link href={logoHref} className='flex items-center'>
                <Image
                  src={logoSrc}
                  alt={logoAlt}
                  width={logoWidth}
                  height={logoHeight}
                  className='object-contain'
                />
              </Link>
            )}

            <div className='flex items-center ml-2'>{leftContent}</div>
          </div>

          {/* Right Side Content */}
          <div className='navbar-end flex items-center flex-wrap justify-end'>
            {rightContent}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
