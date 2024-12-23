import { useTheme } from "@providers/core/theme/theme.provider";
import { Theme } from "@ts-types/base/theme/theme.enum.ts";
import { WithChildren } from "@ts-types/common/component.types";
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
