import cn from 'clsx';

export enum AlertType {
  SUCCESS = 'alert-success',
  INFO = 'alert-info',
  WARNING = 'alert-warning',
  ERROR = 'alert-error',
  PRIMARY = 'alert-primary',
  SECONDARY = 'alert-secondary',
}

interface Props {
  className: string;
  alertType: AlertType;
  message: string;
}

const AlertMessage = ({ className, alertType, message }: Props) => {
  const renderIcon = () => {
    switch (alertType) {
      case AlertType.ERROR:
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='12' cy='12' r='10' />
            <line x1='15' y1='9' x2='9' y2='15' />
            <line x1='9' y1='9' x2='15' y2='15' />
          </svg>
        );
      case AlertType.WARNING:
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z' />
            <line x1='12' y1='9' x2='12' y2='13' />
            <line x1='12' y1='17' x2='12.01' y2='17' />
          </svg>
        );
      case AlertType.SUCCESS:
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='12' cy='12' r='10' />
            <path d='M9 12l2 2 4-4' />
          </svg>
        );
      case AlertType.INFO:
      case AlertType.PRIMARY:
      case AlertType.SECONDARY:
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='12' cy='12' r='10' />
            <line x1='12' y1='16' x2='12' y2='12' />
            <line x1='12' y1='8' x2='12.01' y2='8' />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn('alert ', alertType, className)}>
      <div className='flex items-center gap-3'>
        <div className='flex-shrink-0 text-white'>{renderIcon()}</div>
        <span className='text-white'>{message}</span>
      </div>
    </div>
  );
};

export default AlertMessage;
