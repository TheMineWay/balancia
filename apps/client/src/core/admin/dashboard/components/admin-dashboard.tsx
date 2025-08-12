import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { Button } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { IoMdKey } from "react-icons/io";

export const AdminDashboard: FC = () => {
	const { t } = useTranslation("admin");

	return (
		<ManagerLayout.Root>
			<ManagerLayout.Title>{t().page.Title}</ManagerLayout.Title>
			<ManagerLayout.Content>
				<Link to="/sys/role">
					<Button leftSection={<IoMdKey />}>
						{t().page.links["role-manager"].Label}
					</Button>
				</Link>
			</ManagerLayout.Content>
		</ManagerLayout.Root>
	);
};
