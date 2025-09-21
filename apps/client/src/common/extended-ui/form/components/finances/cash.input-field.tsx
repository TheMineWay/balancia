import { NumberInput, type NumberInputProps } from "@mantine/core";
import { FaMoneyBills } from "react-icons/fa6";

export type CashInputFieldProps = NumberInputProps;

export const CashInputField: FC<CashInputFieldProps> = ({
	max,
	min,
	...props
}) => {
	return (
		<NumberInput
			leftSection={<FaMoneyBills />}
			decimalScale={2}
			allowDecimal={true}
			allowNegative={true}
			{...props}
		/>
	);
};
