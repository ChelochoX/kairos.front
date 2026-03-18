interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
        {title}
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-text-soft)] sm:text-base">
        {description}
      </p>
    </div>
  );
};
