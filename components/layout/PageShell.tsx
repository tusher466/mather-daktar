"use client";

import React from "react";

interface PageShellProps {
  children: React.ReactNode;
  showTabs?: boolean;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return <div className="w-full animate-fade-in">{children}</div>;
};
