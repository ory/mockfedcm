"use client";

import { InputHTMLAttributes } from "react";
import cn from "clsx";

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
}

const TextInput = ({
  label,
  error,
  value,
  onChange,
  className,
  ...props
}: TextInputProps) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-medium">{label}</span>
        </label>
      )}
      <input
        type="text"
        className={cn(
          "input input-bordered w-full",
          {
            "input-error": error,
          },
          className,
        )}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        {...props}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default TextInput;
