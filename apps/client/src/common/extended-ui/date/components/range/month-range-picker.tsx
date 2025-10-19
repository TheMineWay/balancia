import type { DateRange } from "@common/extended-ui/date/hooks/use-date-range";
import { Group } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import clsx from "clsx";
import { addMonths, subMonths } from "date-fns";
import { useMemo } from "react";
import { BsArrowRight } from "react-icons/bs";

const INPUT_CLASS = "flex-1";

type Props = {
	value?: DateRange | null;
	onChange?: (value: DateRange | null) => void;
	className?: string;
	maxDiff?: number;
};

export const MonthRangePicker: FC<Props> = ({
	value,
	onChange,
	className,
	maxDiff,
}) => {
	const fromDate = value?.from || null;
	const toDate = value?.to || null;

	const endMonthMaxDate = useMemo(() => {
		let date = fromDate;
		if (date && maxDiff) date = addMonths(date, maxDiff);
		return date;
	}, [fromDate, maxDiff]);

	const startMonthMinDate = useMemo(() => {
		let date = toDate;
		if (date && maxDiff) date = subMonths(date, maxDiff);
		return date;
	}, [toDate, maxDiff]);

	return (
		<Group className={clsx("w-full flex", className)}>
			<MonthPickerInput
				className={INPUT_CLASS}
				value={fromDate}
				onChange={(raw) => onChange?.({ from: datePipe(raw), to: toDate })}
				size="xs"
				minDate={startMonthMinDate || undefined}
				maxDate={value?.to || undefined}
			/>
			<BsArrowRight />
			<MonthPickerInput
				className={INPUT_CLASS}
				value={toDate}
				onChange={(raw) => onChange?.({ from: fromDate, to: datePipe(raw) })}
				size="xs"
				minDate={value?.from || undefined}
				maxDate={endMonthMaxDate || undefined}
			/>
		</Group>
	);
};

/* Internal */
const datePipe = (rawDate: string | null): Date | null => {
	if (!rawDate) return null;
	return new Date(rawDate);
};
