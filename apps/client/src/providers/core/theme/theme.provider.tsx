import { DEFAULT_THEME } from "@constants/core/base/theme/default-theme.constant";
import { ProviderSetter } from "@providers/provider-setter.type.ts";
import { ThemeInfo } from "@ts-types/base/theme/theme-info.type.ts";
import { WithChildren } from "@ts-types/common/component.types.ts";
import { createContext, useContext, useState } from "react";

const Context = createContext<ProviderSetter<ThemeInfo>>(null!);

export default function ThemeProvider({ children }: Readonly<WithChildren>) {
  const [theme, setTheme] = useState<ThemeInfo>(DEFAULT_THEME);

  return (
    <Context.Provider
      value={{
        setContext: setTheme,
        context: theme,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(Context);

  if (!context) throw new Error("Theme context used outside ThemeProvider");

  return {
    setTheme: context.setContext,
    theme: context.context,
  };
};
