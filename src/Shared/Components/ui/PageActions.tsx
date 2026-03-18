import type { PropsWithChildren } from "react";

export const PageActions = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {children}
    </div>
  );
};
