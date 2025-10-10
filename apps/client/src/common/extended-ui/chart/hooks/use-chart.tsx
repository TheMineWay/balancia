import { useLocalConfig } from "@providers/config/local-config.context";
import { useMemo } from "react";

export const useChart = () => {
	const {
		config: {
			charts: { theme },
		},
	} = useLocalConfig();

	const control = useMemo(() => {
		return {
			scheme: theme,
		};
	}, [theme]);

	return {
		theme,
		control,
	};
};
