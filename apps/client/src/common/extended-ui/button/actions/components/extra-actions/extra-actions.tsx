import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Menu, type MenuProps } from "@mantine/core";
import { HiOutlineDotsVertical } from "react-icons/hi";

export type ExtraActionProps = {
	menuProps?: MenuProps;
	children: React.ReactNode;
};

export const ExtraActions: FC<ExtraActionProps> = ({ children, menuProps }) => {
	const { t: commonT } = useTranslation("common");

	return (
		<Menu position="bottom-end" {...menuProps}>
			<Menu.Target>
				<ActionIcon
					aria-label={commonT().expressions["Extra-actions"]}
					variant="outline"
				>
					<HiOutlineDotsVertical />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>{children}</Menu.Dropdown>
		</Menu>
	);
};
