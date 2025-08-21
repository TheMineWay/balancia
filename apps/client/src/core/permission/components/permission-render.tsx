import { useTranslation } from "@i18n/use-translation";
import { Badge } from "@mantine/core";
import type { Permission } from "@shared/models";

type Props = {
	permission: Permission;
};

/**
 * Component for rendering a permission as a styled badge.
 * Displays the localized permission name within a badge component.
 */
export const PermissionRender: FC<Props> = ({ permission }) => {
	const { t } = useTranslation("role");

	return <Badge>{t().permissions[permission].Name}</Badge>;
};
