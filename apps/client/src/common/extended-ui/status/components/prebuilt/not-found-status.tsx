import notFoundImage from "@assets/core/status/status-404.png";
import { Status } from "@common/extended-ui/status/components/status";
import { useTranslation } from "@i18n/use-translation";

/**
 * Pre-built status component for displaying 404 not found pages.
 * Shows a standardized not found message with accompanying image.
 */
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
