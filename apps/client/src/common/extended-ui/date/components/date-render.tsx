import { Text, type TextProps } from "@mantine/core";
import { format } from "date-fns";
import { useMemo } from "react";

type DateModes = "short" | "long";

type Props = {
	date: Date;
	mode?: DateModes;
	textProps?: TextProps;
};

const MODES: Record<DateModes, string> = {
	short: "dd-MM-yyyy",
	long: "EEEE, dd-MM-yyyy",
};

/**
 * Component for rendering formatted date strings without time information.
 * Supports both short and long date display modes.
 */
export const DateRender: FC<Props> = ({ date, mode = "short", textProps }) => {
	const value = useMemo(() => format(date, MODES[mode]), [date, mode]);

	return <Text {...textProps}>{value}</Text>;
};
