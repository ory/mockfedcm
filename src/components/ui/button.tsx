import { ButtonHTMLAttributes, ReactNode, useState } from 'react';
import cn from 'clsx';
import Link from 'next/link';

// Define variants for the button
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost'
  | 'link';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

// Define the props for our component
interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

// Props for button type
interface ButtonAsButton
  extends ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  as?: 'button';
  href?: never;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Props for link type
interface ButtonAsLink extends ButtonBaseProps {
  as: 'link';
  href: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

// Props for custom action
interface ButtonAsCustom extends ButtonBaseProps {
  as: 'custom';
  href?: never;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  action: 'clear' | 'copy' | 'download' | string;
}

// Define the props for our component
type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsCustom;

// Define the component
export const MultiButton = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText = 'Loading...',
  className = '',
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  as = 'button',
  ...props
}: ButtonProps) => {
  //local loading state
  const [internalLoading, setInternalLoading] = useState(false);

  //Combined loading state (from props or internal)
  const loading = isLoading || internalLoading;

  // base classes for styling
  const baseClasses = cn(
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    loading && 'loading',
    fullWidth && 'w-full',
    className
  );

  // Handle click for button with automatic loading state
  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;

    if (as === 'button' && props.onClick) {
      setInternalLoading(true);
      try {
        await (props as ButtonAsButton).onClick?.(e);
      } finally {
        setInternalLoading(false);
      }
    } else if (as === 'custom' && (props as ButtonAsCustom).onClick) {
      setInternalLoading(true);
      try {
        await (props as ButtonAsCustom).onClick(e);
      } finally {
        setInternalLoading(false);
      }
    }
  };

  // Content with icon
  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && <span className='mr-2'>{icon}</span>}
      {loading ? loadingText : children}
      {icon && iconPosition === 'right' && <span className='ml-2'>{icon}</span>}
    </>
  );

  // Render based on button type
  if (as === 'link') {
    const { href, onClick, ...linkProps } = props as ButtonAsLink;
    return (
      <Link
        href={href}
        className={baseClasses}
        onClick={onClick}
        {...linkProps}
      >
        {buttonContent}
      </Link>
    );
  }

  // For regular button or custom button
  return (
    <button
      className={baseClasses}
      disabled={disabled || loading}
      onClick={handleButtonClick}
      type={as === 'button' ? 'submit' : 'button'}
      {...(props as ButtonAsButton)}
    >
      {buttonContent}
    </button>
  );
};

export default MultiButton;
