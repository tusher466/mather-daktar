"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "amber";
  size?: "default" | "large" | "small";
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "default",
  fullWidth = true,
  isLoading = false,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-bold font-bengali transition-colors duration-150 active:scale-[0.98] select-none rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeClasses = {
    small: "min-h-[44px] px-4 py-2 text-base",
    default: "min-h-[56px] px-5 py-3 text-lg",
    large: "min-h-[64px] px-6 py-4 text-xl",
  }[size];

  const variantClasses = {
    primary:
      "bg-primary hover:bg-primary-dark text-white shadow-sm focus:ring-primary disabled:bg-gray-300 disabled:text-gray-500",
    secondary:
      "bg-white hover:bg-ground text-ink border border-ground-border shadow-sm focus:ring-primary disabled:bg-gray-100 disabled:text-gray-400",
    amber:
      "bg-harvest hover:bg-[#b07421] text-white shadow-sm focus:ring-harvest disabled:bg-gray-300 disabled:text-gray-500",
    danger:
      "bg-danger hover:bg-[#961e17] text-white shadow-sm focus:ring-danger disabled:bg-gray-300 disabled:text-gray-500",
    ghost:
      "bg-transparent hover:bg-black/5 text-ink focus:ring-primary min-h-[44px]",
  }[variant];

  const widthClass = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>অপেক্ষা করুন...</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
        </span>
      )}
    </button>
  );
};
