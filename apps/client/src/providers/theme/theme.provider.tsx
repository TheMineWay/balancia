import { DEFAULT_THEME } from "@constants/base/theme/default-theme.constant.ts";
import { ProviderSetter } from "@providers/provider-setter.type.ts";
import { ThemeInfo } from "@ts-types/base/theme/theme-info.type.ts";
import { WithChildren } from "@ts-types/common/component.types.ts";
import { createContext, useContext, useState } from "react";

const CONTEXT = createContext<ProviderSetter<ThemeInfo>>(null!);

export default function ThemeProvider({ children }: Readonly<WithChildren>) {
  const [theme, setTheme] = useState<ThemeInfo>(DEFAULT_THEME);

  return (
    <CONTEXT.Provider
      value={{
        setProvider: setTheme,
        provider: theme,
      }}
    >
      {children}
    </CONTEXT.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(CONTEXT);

  if (!context) throw new Error("Theme context used outside ThemeProvider");

  return {
    setTheme: context.setProvider,
    theme: context.provider,
  };
};
