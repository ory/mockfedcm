import { useState } from 'react';
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
  mobileBreakpoint = 'md',
  className,
  logoSrc,
  logoAlt = 'Ory Logo',
  logoWidth = 120,
  logoHeight = 40,
  logoHref = '/',
}: HeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={cn('bg-base-100 shadow-md w-full', className)}>
      <div className='container mx-auto px-4'>
        <div className='navbar p-0 min-h-16'>
          {/* Left Side - Always visible */}
          <div className='navbar-start'>
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

            <div className={`hidden ${mobileBreakpoint}:flex items-center`}>
              {leftContent}
            </div>
          </div>

          {/* Center - Can be used if needed */}
          <div className='navbar-center'></div>

          {/* Right Side - Visible on desktop */}
          <div className={`navbar-end hidden ${mobileBreakpoint}:flex`}>
            {rightContent}
          </div>

          {/* Mobile Menu Button */}
          <div className={`navbar-end ${mobileBreakpoint}:hidden`}>
            <button
              className='btn btn-ghost btn-circle'
              onClick={toggleMenu}
              aria-label='Toggle menu'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block w-6 h-6 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Collapsible */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:hidden transition-all duration-200 ease-in-out pb-4`}
        >
          <div className='flex flex-col gap-4'>
            {/* Mobile Left Children */}
            <div className='flex flex-col gap-2'>{leftContent}</div>

            {/* Mobile Right Children */}
            <div className='flex flex-col gap-2'>{rightContent}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
