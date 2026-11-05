import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "amber" | "danger" | "success";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  ...props
}) => {
  const variantClasses = {
    default: "bg-ground-surface border-ground-border text-ink",
    amber: "bg-harvest-light border-harvest-border text-ink",
    danger: "bg-danger-light border-danger/30 text-ink",
    success: "bg-success-light border-success/30 text-ink",
  }[variant];

  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 shadow-sm transition-all ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
