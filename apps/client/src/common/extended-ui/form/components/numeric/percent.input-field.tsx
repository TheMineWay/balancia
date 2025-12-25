import { NumberInput, type NumberInputProps } from "@mantine/core";
import { TbPercentage } from "react-icons/tb";

export type PercentInputFieldProps = Omit<
	NumberInputProps,
	"value" | "onChange"
> & {
	value?: number;
	onChange?: (value: number | null) => void;
};

export const PercentInputField: FC<PercentInputFieldProps> = ({
	max = 100,
	min = 0,
	value,
	onChange,
	...props
}) => {
	return (
		<NumberInput
			leftSection={<TbPercentage />}
			suffix="%"
			decimalScale={2}
			allowDecimal={true}
			allowNegative={false}
			min={min}
			max={max}
			value={value ?? 0}
			onChange={(v) => onChange?.(+v)}
			{...props}
		/>
	);
};
