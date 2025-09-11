import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { useLocalConfig } from "@providers/config/local-config.context";
import { useMemo } from "react";

export const UIProviders: FC<WithChildren> = ({ children }) => {
	const {
		config: { theme: themeConfig },
	} = useLocalConfig();

	const theme = useMemo(
		() =>
			createTheme({
				primaryColor: themeConfig.primaryColor ?? "red",
			}),
		[themeConfig],
	);

	return (
		<MantineProvider
			forceColorScheme={themeConfig.colorScheme}
			theme={theme}
			defaultColorScheme={themeConfig.colorScheme}
		>
			<ModalsProvider>
				<Notifications />
				{children}
			</ModalsProvider>
		</MantineProvider>
	);
};
