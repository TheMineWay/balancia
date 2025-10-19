import type { DateRange } from "@common/extended-ui/date/hooks/use-date-range";
import { Group } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";

const INPUT_CLASS = "w-24";

type Props = {
	value?: DateRange | null;
	onChange?: (value: DateRange | null) => void;
};

export const MonthRangePicker: FC<Props> = ({ value, onChange }) => {
	const fromDate = value?.from || null;
	const toDate = value?.to || null;

	return (
		<Group>
			<MonthPickerInput
				className={INPUT_CLASS}
				value={fromDate}
				onChange={(raw) => onChange?.({ from: datePipe(raw), to: toDate })}
			/>
			<MonthPickerInput
				className={INPUT_CLASS}
				value={toDate}
				onChange={(raw) => onChange?.({ from: fromDate, to: datePipe(raw) })}
			/>
		</Group>
	);
};

/* Internal */
const datePipe = (rawDate: string | null): Date | null => {
	if (!rawDate) return null;
	return new Date(rawDate);
};
