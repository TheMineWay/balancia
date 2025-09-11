import { Text } from "@mantine/core";

type Props = {
	amount: number;
};

export const RenderCurrency: FC<Props> = ({ amount }) => {
	return <Text>{amount.toFixed(2)}€</Text>;
};
