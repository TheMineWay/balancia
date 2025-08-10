import { ADMIN_ROLES_WITH_STATS_QUERY_KEY } from "@core/auth/role/manager/api/use-admin-roles-with-stats.query";
import { useRoleDeleteMutation } from "@core/auth/role/manager/api/use-role-delete.mutation";
import { RoleCreateManager } from "@core/auth/role/manager/components/role-create-manager";
import { RolePermissionAssign } from "@core/auth/role/manager/components/role-permission-assign";
import { RoleUpdateManager } from "@core/auth/role/manager/components/role-update-manager";
import { RoleUsersManager } from "@core/auth/role/manager/components/role-users-manager";
import { RolesTable } from "@core/auth/role/manager/components/roles-table";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Drawer, ScrollArea, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import type { RoleModel } from "@shared/models";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoAddOutline, IoReload, IoTrash } from "react-icons/io5";

export const RoleManager: FC = () => {
	const { t, interpolated } = useTranslation("role");
	const { t: commonT } = useTranslation("common");

	const queryClient = useQueryClient();

	const { mutate: deleteRole } = useRoleDeleteMutation();
	const [createOpened, { open, close }] = useDisclosure(false);
	const [selectedToEditRole, setSelectedToEditRole] =
		useState<RoleModel | null>(null);
	const [selectedToManageUsersRole, setSelectedToManageUsersRole] =
		useState<RoleModel | null>(null);
	const [selectedToAssignPermissionsRole, setSelectedToAssignPermissionsRole] =
		useState<RoleModel | null>(null);

	const onDeleteClick = (role: RoleModel) => {
		modals.openConfirmModal({
			title: t().admin.managers.delete.Title,
			children: (
				<Text>
					{interpolated((t) => t.admin.managers.delete.confirm.Message, {
						name: role.name,
					})}
				</Text>
			),
			onConfirm: () => deleteRole(role.id),
			labels: {
				cancel: commonT().templates["confirm-modal"].Cancel,
				confirm: t().admin.managers.delete.Action,
			},
			confirmProps: { color: "red", leftSection: <IoTrash /> },
		});
	};

	return (
		<>
			<ManagerLayout.Root>
				<ManagerLayout.Content>
					{/* Table */}
					<TableLayout.Root>
						{/* Table actions */}
						<TableLayout.Actions>
							<ActionsLayout.Row>
								<Button leftSection={<IoAddOutline />} onClick={open}>
									{t().admin.managers.create.Action}
								</Button>
							</ActionsLayout.Row>
							<ActionsLayout.Row>
								<ActionIcon aria-label={commonT().expressions.Reload} onClick={() => queryClient.invalidateQueries({ queryKey: ADMIN_ROLES_WITH_STATS_QUERY_KEY()})}>
									<IoReload/>
								</ActionIcon>
							</ActionsLayout.Row>
						</TableLayout.Actions>

						{/* Table component */}
						<TableLayout.Table>
							<RolesTable
								onEditClick={setSelectedToEditRole}
								onUserAssignClick={setSelectedToManageUsersRole}
								onDeleteClick={onDeleteClick}
								onPermissionAssignClick={setSelectedToAssignPermissionsRole}
							/>
						</TableLayout.Table>
					</TableLayout.Root>
				</ManagerLayout.Content>
			</ManagerLayout.Root>

			<Drawer
				position="right"
				opened={createOpened}
				onClose={close}
				title={t().admin.managers.create.Title}
			>
				<RoleCreateManager onSuccess={close} />
			</Drawer>

			<Drawer
				title={t().admin.managers.update.Title}
				position="right"
				opened={Boolean(selectedToEditRole)}
				onClose={() => setSelectedToEditRole(null)}
			>
				{selectedToEditRole && (
					<RoleUpdateManager
						onSuccess={() => setSelectedToEditRole(null)}
						role={selectedToEditRole}
					/>
				)}
			</Drawer>

			<Drawer
				title={t().admin.managers["role-users"].Title}
				opened={Boolean(selectedToManageUsersRole)}
				onClose={() => setSelectedToManageUsersRole(null)}
				position="right"
				scrollAreaComponent={ScrollArea.Autosize}
			>
				{selectedToManageUsersRole && (
					<RoleUsersManager role={selectedToManageUsersRole} />
				)}
			</Drawer>

			<Drawer
				title={interpolated(
					(t) => t.admin.managers["assign-permissions"].Title,
					{ name: selectedToAssignPermissionsRole?.name || "" },
				)}
				opened={Boolean(selectedToAssignPermissionsRole)}
				onClose={() => setSelectedToAssignPermissionsRole(null)}
				position="right"
			>
				{selectedToAssignPermissionsRole && (
					<RolePermissionAssign
						role={selectedToAssignPermissionsRole}
						onSuccess={() => setSelectedToAssignPermissionsRole(null)}
					/>
				)}
			</Drawer>
		</>
	);
};
