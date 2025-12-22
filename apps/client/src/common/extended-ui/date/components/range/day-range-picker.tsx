import type { DateRange } from "@common/extended-ui/date/hooks/use-date-range";
import { Group } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import clsx from "clsx";
import { addDays, subDays } from "date-fns";
import { useMemo } from "react";
import { BsArrowRight } from "react-icons/bs";

const INPUT_CLASS = "flex-1";

type Props = {
	value?: DateRange | null;
	onChange?: (value: DateRange | null) => void;
	className?: string;
	maxDiff?: number;
};

export const DayRangePicker: FC<Props> = ({
	value,
	onChange,
	className,
	maxDiff,
}) => {
	const fromDate = value?.from || null;
	const toDate = value?.to || null;

	const endDayMaxDate = useMemo(() => {
		let date = fromDate;
		if (date && maxDiff) date = addDays(date, maxDiff);
		return date;
	}, [fromDate, maxDiff]);

	const startDayMinDate = useMemo(() => {
		let date = toDate;
		if (date && maxDiff) date = subDays(date, maxDiff);
		return date;
	}, [toDate, maxDiff]);

	return (
		<Group className={clsx("w-full flex", className)}>
			<DateInput
				className={INPUT_CLASS}
				value={fromDate}
				onChange={(raw) => onChange?.({ from: datePipe(raw), to: toDate })}
				size="xs"
				minDate={startDayMinDate || undefined}
				maxDate={value?.to || undefined}
				allowDeselect
			/>
			<BsArrowRight />
			<DateInput
				className={INPUT_CLASS}
				value={toDate}
				onChange={(raw) => onChange?.({ from: fromDate, to: datePipe(raw) })}
				size="xs"
				minDate={value?.from || undefined}
				maxDate={endDayMaxDate || undefined}
				allowDeselect
			/>
		</Group>
	);
};

/* Internal */
const datePipe = (rawDate: string | null): Date | null => {
	if (!rawDate) return null;
	return new Date(rawDate);
};
