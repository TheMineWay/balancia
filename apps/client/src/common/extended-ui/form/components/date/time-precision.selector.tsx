import { SegmentedControl, type SegmentedControlProps } from "@mantine/core";
import { TimePrecision } from "@shared/models";

type TimePrecisionSelectorProps = Omit<
	SegmentedControlProps,
	"data" | "onChange"
> & { onChange?: (value: TimePrecision) => void };

export const TimePrecisionSelector: FC<TimePrecisionSelectorProps> = ({
	onChange,
	...props
}) => {
	return (
		<SegmentedControl
			data={[TimePrecision.DATETIME, TimePrecision.DATE]}
			onChange={(v) =>
				onChange?.(
					v === TimePrecision.DATETIME
						? TimePrecision.DATETIME
						: TimePrecision.DATE,
				)
			}
			{...props}
		/>
	);
};
