import { NumberInput, type NumberInputProps } from "@mantine/core";
import { FaMoneyBills } from "react-icons/fa6";

export type CashInputFieldProps = Omit<
	NumberInputProps,
	"value" | "onChange"
> & {
	value?: number;
	onChange?: (value: number | null) => void;
};

export const CashInputField: FC<CashInputFieldProps> = ({
	max,
	min,
	value,
	onChange,
	...props
}) => {
	return (
		<NumberInput
			leftSection={<FaMoneyBills />}
			decimalScale={2}
			allowDecimal={true}
			allowNegative={true}
			value={value ?? 0}
			onChange={(v) => onChange?.(+v)}
			{...props}
		/>
	);
};
