import {
	type DateModes,
	useDateFormat,
} from "@common/extended-ui/date/hooks/use-date-format";
import { Text } from "@mantine/core";
import { useMemo } from "react";

type Props = {
	date: Date;
	mode?: DateModes;
};

/**
 * Component for rendering formatted datetime strings with predefined formats.
 * Supports both short and long date/time display modes.
 */
export const DatetimeRender: FC<Props> = ({ date, mode = "short" }) => {
	const { formatDateTime } = useDateFormat();

	const value = useMemo(
		() => formatDateTime(date, mode),
		[date, mode, formatDateTime],
	);

	return <Text>{value}</Text>;
};
