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
    "inline-flex items-center justify-center font-bold font-bengali transition-all duration-200 active:scale-[0.97] select-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeClasses = {
    small: "min-h-[44px] px-4 py-2 text-base",
    default: "min-h-[56px] px-5 py-3.5 text-lg",
    large: "min-h-[64px] px-6 py-4 text-xl tracking-wide",
  }[size];

  const variantClasses = {
    primary:
      "bg-gradient-to-b from-[#257A43] to-[#1A5C32] hover:from-[#2C8B4D] hover:to-[#1E6738] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/25 border border-emerald-600/30 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "bg-white hover:bg-stone-50 text-ink border border-ground-border shadow-xs hover:shadow-sm focus:ring-primary disabled:bg-gray-100 disabled:text-gray-400",
    amber:
      "bg-gradient-to-b from-[#D49332] to-[#B87A22] hover:from-[#DF9D38] hover:to-[#C28226] text-white shadow-md shadow-amber-900/20 hover:shadow-lg focus:ring-harvest disabled:opacity-50",
    danger:
      "bg-gradient-to-b from-[#C42E25] to-[#A32018] hover:from-[#D1342B] hover:to-[#B3241C] text-white shadow-md shadow-red-900/20 focus:ring-danger disabled:opacity-50",
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
        <span className="inline-flex items-center gap-2.5">
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
        <span className="inline-flex items-center gap-2.5">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
        </span>
      )}
    </button>
  );
};
