import notFoundImage from "@assets/core/status/status-500.png";
import { Status } from "@common/extended-ui/status/components/status";
import { useTranslation } from "@i18n/use-translation";

export const InternalServerErrorStatus: FC = () => {
	const { t } = useTranslation("common");

	return (
		<Status
			src={notFoundImage}
			title={t().components.status["internal-server-error"].Title}
			description={t().components.status["internal-server-error"].Description}
		/>
	);
};
