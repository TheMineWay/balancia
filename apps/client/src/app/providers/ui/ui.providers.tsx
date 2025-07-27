import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { useLocalConfig } from "@providers/config/local-config.context";
import { useMemo } from "react";
import type { WithChildren } from "src/common/types/component/component.types";

export default function UIProviders({ children }: Readonly<WithChildren>) {
  const {
    config: { theme: themeConfig },
  } = useLocalConfig();

  const theme = useMemo(
    () =>
      createTheme({
        primaryColor: themeConfig.primaryColor ?? "red",
      }),
    [themeConfig]
  );

  return (
    <MantineProvider theme={theme} defaultColorScheme={themeConfig.colorScheme}>
      <ModalsProvider>
        <Notifications />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
}
