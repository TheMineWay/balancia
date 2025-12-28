import type { NivoColor } from "@common/extended-ui/chart/constants/nivo-color.enum";
import { useLocalConfig } from "@providers/config/local-config.context";
import { useMemo } from "react";

type Mode = keyof typeof CHART_EXTENDED_PROPERTIES;

export const useChart = (mode: Mode) => {
	const {
		config: {
			charts: { theme: nivoTheme },
			theme: { colorScheme },
		},
	} = useLocalConfig();

	const control = useMemo(() => {
		const props: ModeProps = { nivoTheme, colorScheme };

		return {
			colors: {
				scheme: nivoTheme,
			},
			borderColor: {
				from: "color",
			},
			...(mode ? CHART_EXTENDED_PROPERTIES[mode](props) : {}),
		};
	}, [nivoTheme, mode, colorScheme]);

	return {
		nivoTheme,
		control,
	};
};

/* Modes */

type ModeProps = {
	nivoTheme: NivoColor;
	colorScheme: "light" | "dark";
};
type ModeFactory = (props: ModeProps) => Record<string, unknown>;

/**
 * Extended properties for different chart modes
 */
const CHART_EXTENDED_PROPERTIES = {
	/**
	 * PIE CHART
	 */
	pie: ({ colorScheme }) => ({
		arcLinkLabelsTextColor: getTextColorByScheme(colorScheme),
		arcLinkLabel: "label",
	}),

	/**
	 * LINE CHART
	 */
	line: ({ colorScheme }) => ({
		theme: {
			text: {
				fill: getTextColorByScheme(colorScheme),
			},
			grid: {
				line: {
					stroke: colorScheme === "dark" ? "#444" : "#ddd",
					strokeWidth: 1,
				},
			},
		},
	}),

	/**
	 * BAR CHART
	 */
	bar: ({ colorScheme }) => ({
		theme: {
			axis: {
				ticks: {
					text: {
						fill: getTextColorByScheme(colorScheme),
					},
				},
				legend: {
					text: {
						fill: getTextColorByScheme(colorScheme),
					},
				},
			},
			grid: {
				line: {
					stroke: colorScheme === "dark" ? "#444" : "#ddd",
					strokeWidth: 1,
				},
			},
		},
	}),
} satisfies Record<string, ModeFactory>;

/* Internal utils */

const getTextColorByScheme = (colorScheme: "light" | "dark") => {
	return colorScheme === "dark" ? "white" : "black";
};
