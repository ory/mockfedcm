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
    <div className="self-stretch inline-flex flex-col justify-start items-start gap-1">
      {label && (
        <label className="label self-stretch inline-flex justify-start items-center gap-8">
          <span className="label-text font-medium flex-1 justify-start text-gray-900 text-sm font-['Schibsted_Grotesk'] leading-tight">
            {label}
          </span>
        </label>
      )}
      <input
        type="text"
        className={cn(
          "self-stretch p-3 bg-white rounded outline outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-2 overflow-hidden",
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
