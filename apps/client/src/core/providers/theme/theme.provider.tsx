import { DEFAULT_THEME } from "@core/constants/theme/default-theme.constant";
import { ProviderSetter } from "@core/providers/provider-setter.type";
import { ThemeInfo } from "@core/types/base/theme/theme-info.type";
import { WithChildren } from "@core/types/common/component.types";
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
