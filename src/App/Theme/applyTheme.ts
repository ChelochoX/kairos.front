import type { ThemeConfig } from "./theme.types";

export const applyTheme = (theme: ThemeConfig) => {
  const root = document.documentElement;

  root.style.setProperty("--color-primary", theme.primary);
  root.style.setProperty("--color-primary-hover", theme.primaryHover);
  root.style.setProperty("--color-primary-soft", theme.primarySoft);

  root.style.setProperty("--color-bg", theme.background);
  root.style.setProperty("--color-bg-soft", theme.backgroundSoft);

  root.style.setProperty("--color-card", theme.card);
  root.style.setProperty("--color-card-hover", theme.cardHover);

  root.style.setProperty("--color-text", theme.text);
  root.style.setProperty("--color-text-soft", theme.textSoft);
  root.style.setProperty("--color-border", theme.border);
};
