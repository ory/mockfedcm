'use client';

import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface CheckboxInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  onChange?: (checked: boolean) => void;
}

const CheckboxInput = ({
  label,
  error,
  checked,
  onChange,
  className,
  ...props
}: CheckboxInputProps) => {
  return (
    <div className='form-control'>
      <label className='label cursor-pointer justify-start gap-2'>
        <input
          type='checkbox'
          className={clsx(
            'checkbox',
            {
              'checkbox-error': error,
            },
            className
          )}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          {...props}
        />
        {label && <span className='label-text font-medium'>{label}</span>}
      </label>
      {error && (
        <label className='label'>
          <span className='label-text-alt text-error'>{error}</span>
        </label>
      )}
    </div>
  );
};

export default CheckboxInput;
