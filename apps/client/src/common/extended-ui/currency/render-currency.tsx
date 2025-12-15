import { Text, type TextProps } from "@mantine/core";

type Props = {
	amount: number;
} & TextProps;

export const RenderCurrency: FC<Props> = ({ amount, ...props }) => {
	return <Text {...props}>{amount.toFixed(2)}€</Text>;
};
