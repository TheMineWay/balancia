import { useTranslation } from "@i18n/use-translation";
import { Badge } from "@mantine/core";
import { DebtStatus } from "@shared/models";

type Props = {
	status: DebtStatus;
};

export const DebtStatusBadge: FC<Props> = ({ status }) => {
	const { t } = useTranslation("finances");

	return (
		<Badge color={COLORS[status]}>
			{t().debt.models["debt-status"][status].Label}
		</Badge>
	);
};

/* Color maps */
const COLORS = {
	[DebtStatus.PENDING]: "yellow",
	[DebtStatus.PAID]: "green",
	[DebtStatus.WONT_PAY]: "red",
	[DebtStatus.PARDONED]: "blue",
} satisfies Record<DebtStatus, string>;
