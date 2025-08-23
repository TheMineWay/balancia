import { Text } from "@mantine/core";
import { format } from "date-fns";
import { useMemo } from "react";

type DateModes = "short" | "long";

type Props = {
	date: Date;
	mode?: DateModes;
};

const MODES: Record<DateModes, string> = {
	short: "dd-MM-yyyy HH:mm:ss",
	long: "EEEE, dd-MM-yyyy HH:mm:ss",
};

/**
 * Component for rendering formatted datetime strings with predefined formats.
 * Supports both short and long date/time display modes.
 */
export const DatetimeRender: FC<Props> = ({ date, mode = "short" }) => {
	const value = useMemo(() => format(date, MODES[mode]), [date, mode]);

	return <Text>{value}</Text>;
};
