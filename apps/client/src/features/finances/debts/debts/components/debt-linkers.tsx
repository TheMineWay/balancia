import { useTranslation } from "@i18n/use-translation";
import { Button, Card, Text } from "@mantine/core";

type Props = {
	onSelect?: (linker: DebtLinker) => void;
};

export const DebtLinkers: FC<Props> = ({ onSelect }) => {
	return (
		<div className="flex gap-2">
			<Item linker={DebtLinker.ORIGIN} onSelect={onSelect} />
			<Item linker={DebtLinker.PAYMENT} onSelect={onSelect} />
		</div>
	);
};

/* Internal */
type ItemProps = {
	linker: DebtLinker;
	onSelect?: (linker: DebtLinker) => void;
};

const Item: FC<ItemProps> = ({ linker, onSelect }) => {
	const { t } = useTranslation("finances");

	return (
		<Card withBorder className="flex flex-col gap-2">
			<Text className="text-center">
				<b>{t().debt.link.linkers[linker].Title}</b>
			</Text>
			<Text className="text-center" size="sm">
				{t().debt.link.linkers[linker].Description}
			</Text>
			<Button variant="outline" onClick={() => onSelect?.(linker)}>
				{t().debt.link.linkers[linker].Pick}
			</Button>
		</Card>
	);
};

/* Types */
export enum DebtLinker {
	ORIGIN = "origin",
	PAYMENT = "payment",
}
