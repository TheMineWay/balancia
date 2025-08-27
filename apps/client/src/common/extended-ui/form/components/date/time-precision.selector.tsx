import { useTranslation } from "@i18n/use-translation";
import { SegmentedControl, type SegmentedControlProps } from "@mantine/core";
import { TimePrecision } from "@shared/models";
import { useMemo } from "react";

type TimePrecisionSelectorProps = Omit<
	SegmentedControlProps,
	"data" | "onChange"
> & { onChange?: (value: TimePrecision) => void };

export const TimePrecisionSelector: FC<TimePrecisionSelectorProps> = ({
	onChange,
	...props
}) => {
	const { t } = useTranslation("common");

	const options = useMemo(
		() => [
			{
				label: t().templates["time-precision"].options.datetime.Label,
				value: TimePrecision.DATETIME,
			},
			{
				label: t().templates["time-precision"].options.date.Label,
				value: TimePrecision.DATE,
			},
		],
		[t],
	);

	return (
		<SegmentedControl
			data={options}
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
