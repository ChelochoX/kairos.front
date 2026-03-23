// Shared/ui/PageTitle.tsx
import type { ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

export const PageTitle = ({ children, className = "" }: PageTitleProps) => {
  return (
    <h1
      className={`text-2xl font-bold tracking-tight sm:text-3xl ${className}`}
    >
      {children}
    </h1>
  );
};
