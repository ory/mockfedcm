'use client';

import { SelectHTMLAttributes } from 'react';
import clsx from 'clsx';

export interface SelectOption<T extends string | number | readonly string[]> {
  value: T;
  label: string;
}

interface SelectInputProps<T extends string | number | readonly string[]>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption<T>[];
  error?: string;
  onChange?: (value: T) => void;
}

function SelectInput<T extends string | number | readonly string[]>({
  label,
  options,
  error,
  value,
  onChange,
  className,
  ...props
}: SelectInputProps<T>) {
  return (
    <div className='form-control w-full'>
      {label && (
        <label className='label'>
          <span className='label-text font-medium'>{label}</span>
        </label>
      )}
      <select
        className={clsx(
          'select select-bordered w-full',
          {
            'select-error': error,
          },
          className
        )}
        value={value as string}
        onChange={(e) => onChange?.(e.target.value as T)}
        {...props}
      >
        {options.map((option) => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <label className='label'>
          <span className='label-text-alt text-error'>{error}</span>
        </label>
      )}
    </div>
  );
}

export default SelectInput;
