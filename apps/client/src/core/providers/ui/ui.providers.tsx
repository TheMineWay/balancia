import { useTheme } from "@core/providers/theme/theme.context";
import { Theme } from "@core/types/base/theme/theme.enum";
import type { WithChildren } from "@core/types/common/component.types";
import { ConfigProvider, theme as antdTheme } from "antd";

export default function UIProviders({ children }: Readonly<WithChildren>) {
  const { theme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme.theme === Theme.DARK
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
