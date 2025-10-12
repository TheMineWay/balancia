import { Group } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";

const INPUT_CLASS = "w-24";

type Value = [Date | null, Date | null];

type Props = {
	value?: Value;
	onChange?: (value: Value | null) => void;
};

export const MonthRangePicker: FC<Props> = ({
	value: [fromDate, toDate] = [null, null],
	onChange,
}) => {
	return (
		<Group>
			<MonthPickerInput
				className={INPUT_CLASS}
				value={fromDate}
				onChange={(raw) => onChange?.([datePipe(raw), toDate])}
			/>
			<MonthPickerInput
				className={INPUT_CLASS}
				value={toDate}
				onChange={(raw) => onChange?.([fromDate, datePipe(raw)])}
			/>
		</Group>
	);
};

/* Internal */
const datePipe = (rawDate: string | null): Date | null => {
	if (!rawDate) return null;
	return new Date(rawDate);
};
