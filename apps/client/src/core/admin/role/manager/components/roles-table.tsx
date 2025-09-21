import { DatetimeRender } from "@common/extended-ui/date/components/datetime-render";
import { Table } from "@common/extended-ui/table/components/table";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import { useAdminRolesWithStatsQuery } from "@core/admin/role/manager/api/use-admin-roles-with-stats.query";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Group } from "@mantine/core";
import type { RoleModel } from "@shared/models";
import { FaUserEdit } from "react-icons/fa";
import { IoPencil, IoTrash } from "react-icons/io5";
import { MdKey } from "react-icons/md";

type RoleTableData = RoleModel & {
	permissionsCount: number;
	usersCount: number;
};

type Props = {
	onEditClick?: (role: RoleModel) => void;
	onDeleteClick?: (role: RoleModel) => void;
	onUserAssignClick?: (role: RoleModel) => void;
	onPermissionAssignClick?: (role: RoleModel) => void;
	isDeleting?: boolean;
};

export const RolesTable: FC<Props> = ({
	onEditClick,
	onDeleteClick,
	onUserAssignClick,
	onPermissionAssignClick,
	isDeleting = false,
}) => {
	const { data: { roles } = {}, isLoading: isLoadingRoles } =
		useAdminRolesWithStatsQuery();

	const { t: commonT } = useTranslation("common");
	const { t } = useTranslation("role");

	const table = useTable<RoleTableData>({
		data: roles,
		columns: [
			{
				label: t().models.role.fields.name.Name,
				accessorKey: "name",
			},
			{
				label: commonT().expressions["Created-at"],
				accessorKey: "createdAt",
				render: (item) => <DatetimeRender mode="long" date={item.createdAt} />,
			},
			{
				label: t().admin.table.columns["users-count"].Label,
				accessorKey: "usersCount",
			},
			{
				label: t().admin.table.columns["permissions-count"].Label,
				accessorKey: "permissionsCount",
			},
			{
				label: commonT().expressions.Actions,
				styles: { cell: { minWidth: "12rem" } },
				render: (row) => (
					<Group gap="sm">
						{onEditClick && (
							<ActionIcon
								aria-label={commonT().expressions.Edit}
								onClick={() => onEditClick(row)}
							>
								<IoPencil />
							</ActionIcon>
						)}
						{onUserAssignClick && (
							<ActionIcon
								aria-label={t().admin.managers["role-users"].Action}
								onClick={() => onUserAssignClick(row)}
								variant="outline"
							>
								<FaUserEdit />
							</ActionIcon>
						)}
						{onPermissionAssignClick && (
							<ActionIcon
								aria-label={t().admin.managers["assign-permissions"].Action}
								onClick={() => onPermissionAssignClick(row)}
								variant="outline"
							>
								<MdKey />
							</ActionIcon>
						)}
						{onDeleteClick && (
							<ActionIcon
								aria-label={t().admin.managers.delete.Action}
								loading={isDeleting}
								onClick={() => onDeleteClick(row)}
								variant="outline"
								color="red"
							>
								<IoTrash />
							</ActionIcon>
						)}
					</Group>
				),
			},
		],
		rowKey: "id",
	});
	return <Table table={table} loading={isLoadingRoles} />;
};
