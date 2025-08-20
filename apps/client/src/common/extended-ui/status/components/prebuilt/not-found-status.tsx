import notFoundImage from "@assets/core/status/status-404.png";
import { Status } from "@common/extended-ui/status/components/status";
import { useTranslation } from "@i18n/use-translation";

export const NotFoundStatus: FC = () => {
	const { t } = useTranslation("common");

	return (
		<Status
			src={notFoundImage}
			title={t().components.status["not-found"].Title}
			description={t().components.status["not-found"].Description}
		/>
	);
};
