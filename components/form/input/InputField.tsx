import React, { FC } from "react";

export interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;

  /** Controlled input */
  value?: string | number;

  /** Uncontrolled input */
  defaultValue?: string | number;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;

  /** UI states */
  success?: boolean;
  error?: boolean;
  hint?: string;
}

const Input: FC<InputProps> = ({
  type = "text",
  id,
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
}) => {
  let inputClasses =
    "h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs " +
    "placeholder:text-gray-400 focus:outline-none focus:ring-3 " +
    "dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ";

  if (disabled) {
    inputClasses +=
      "border-gray-300 text-gray-500 cursor-not-allowed " +
      "dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 ";
  } else if (error) {
    inputClasses +=
      "border-error-500 text-error-800 focus:ring-error-500/10 " +
      "dark:text-error-400 dark:border-error-500 ";
  } else if (success) {
    inputClasses +=
      "border-success-400 text-success-600 focus:ring-success-500/10 " +
      "dark:text-success-400 dark:border-success-500 ";
  } else {
    inputClasses +=
      "border-gray-300 text-gray-800 focus:border-brand-300 focus:ring-brand-500/10 " +
      "dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 ";
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={`${inputClasses} ${className}`}
      />

      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
              ? "text-success-500"
              : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
