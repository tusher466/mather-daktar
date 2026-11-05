import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "harvest" | "danger" | "success" | "neutral";
  size?: "small" | "default";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "default",
}) => {
  const sizeClasses = size === "small" ? "text-sm px-2.5 py-0.5" : "text-base px-3 py-1";

  const variantClasses = {
    primary: "bg-primary-light text-primary border border-primary/20",
    harvest: "bg-harvest-light text-[#9A6210] border border-harvest-border font-semibold",
    danger: "bg-danger-light text-danger border border-danger/20 font-semibold",
    success: "bg-success-light text-success border border-success/20 font-semibold",
    neutral: "bg-gray-100 text-ink-muted border border-gray-200",
  }[variant];

  return (
    <span
      className={`inline-flex items-center rounded-full font-bengali ${sizeClasses} ${variantClasses}`}
    >
      {children}
    </span>
  );
};
