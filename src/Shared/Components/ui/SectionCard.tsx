import type { PropsWithChildren } from "react";

interface SectionCardProps extends PropsWithChildren {
  className?: string;
}

export const SectionCard = ({ children, className = "" }: SectionCardProps) => {
  return (
    <section
      className={`rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-sm)] transition sm:p-7 ${className}`}
    >
      {children}
    </section>
  );
};
