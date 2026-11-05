"use client";

import React, { useEffect } from "react";
import { Button } from "./Button";
import { STRINGS_BN } from "@/lib/strings.bn";

interface DialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  description,
  confirmLabel = STRINGS_BN.actions.confirm,
  cancelLabel = STRINGS_BN.actions.cancel,
  isDestructive = false,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-ground-border">
        <h3 className="text-2xl font-bold font-bengali text-ink mb-2">{title}</h3>
        <p className="text-lg font-bengali text-ink-muted mb-6 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col gap-3">
          <Button
            variant={isDestructive ? "danger" : "primary"}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
