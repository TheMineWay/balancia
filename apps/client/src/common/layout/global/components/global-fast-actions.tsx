import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Affix } from "@mantine/core";
import { BsDpad } from "react-icons/bs";

export const GlobalFastActions: FC = () => {
	const { t: commonT } = useTranslation("common");

	return (
		<Affix position={{ bottom: "xl", right: "xl" }}>
			<ActionIcon
				size="xl"
				radius="xl"
				aria-label={commonT().components["global-fast-actions"].Name}
			>
				<BsDpad />
			</ActionIcon>
		</Affix>
	);
};
