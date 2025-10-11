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
			colors: {
				scheme: theme,
			},
			borderColor: {
				from: "color",
			},
		};
	}, [theme]);

	return {
		theme,
		control,
	};
};
