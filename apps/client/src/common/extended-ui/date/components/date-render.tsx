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
 * Component for rendering formatted date strings without time information.
 * Supports both short and long date display modes.
 */
export const DateRender: FC<Props> = ({ date, mode = "short" }) => {
	const { formatDate } = useDateFormat();

	const value = useMemo(() => formatDate(date, mode), [date, mode, formatDate]);

	return <Text>{value}</Text>;
};
