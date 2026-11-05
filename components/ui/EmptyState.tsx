import React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl border border-ground-border my-6 shadow-sm">
      <div className="w-16 h-16 rounded-full bg-ground flex items-center justify-center text-ink-muted mb-4">
        {icon || <FolderOpen className="w-8 h-8" />}
      </div>
      <h3 className="text-2xl font-bold font-bengali text-ink mb-2">{title}</h3>
      <p className="text-lg font-bengali text-ink-muted mb-6 max-w-sm leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction} fullWidth={false} className="px-8">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
