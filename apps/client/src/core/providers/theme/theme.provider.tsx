import { DEFAULT_THEME } from "@core/constants/theme/default-theme.constant";
import { THEME_CONTEXT } from "@core/providers/theme/theme.context";
import { ThemeInfo } from "@core/types/base/theme/theme-info.type";
import { WithChildren } from "@core/types/common/component.types";
import { useState } from "react";

export default function ThemeProvider({ children }: Readonly<WithChildren>) {
  const [theme, setTheme] = useState<ThemeInfo>(DEFAULT_THEME);

  return (
    <THEME_CONTEXT.Provider
      value={{
        setContext: setTheme,
        context: theme,
      }}
    >
      {children}
    </THEME_CONTEXT.Provider>
  );
}
