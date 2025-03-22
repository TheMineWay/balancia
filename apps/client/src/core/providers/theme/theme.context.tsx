import type { ProviderSetter } from "@core/providers/provider-setter.type";
import type { ThemeInfo } from "@core/types/base/theme/theme-info.type";
import { createContext, useContext } from "react";

export const THEME_CONTEXT = createContext<ProviderSetter<ThemeInfo>>(null!);

export const useTheme = () => {
  const context = useContext(THEME_CONTEXT);

  if (!context) throw new Error("Theme context used outside ThemeProvider");

  return {
    setTheme: context.setContext,
    theme: context.context,
  };
};
