import { DebouncedSearch } from "@common/extended-ui/form/items/search/debounced-search";
import { useDebouncedSearch } from "@common/extended-ui/form/items/search/use-debounced-search";
import List from "@common/extended-ui/list/list";
import { UserCard } from "@common/extended-ui/user/user-card";
import { usePagination } from "@common/hooks/use-pagination";
import { useRoleUserUnassignMutation } from "@core-fts/role/manager/api/role-user/use-role-user-unassign.mutation";
import { useRoleUsersListQuery } from "@core-fts/role/manager/api/role-user/use-role-users-list.query";
import { RoleUserAssign } from "@core-fts/role/manager/components/role-user-assign";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Modal, Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { RoleModel } from "@shared/models";
import { useCallback } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";

type Props = {
	role: RoleModel;
};

/**
 * Component to manage users assigned to a specific role.
 * It allows searching for users, displaying them in a list,
 * and unassigning users from the role.
 *
 * It has been designed to be contained in a drawer.
 */
export const RoleUsersManager: FC<Props> = ({ role }) => {
	const { interpolated: commonInterpolated } = useTranslation("common");
	const { t, interpolated } = useTranslation("role");

	const [assignRoleOpened, { open: openAssignRole, close: closeAssignRole }] =
		useDisclosure(false);

	const pagination = usePagination();
	const { mutate: unassignUser } = useRoleUserUnassignMutation();

	const search = useDebouncedSearch();

	const { data: { items: users = [] } = {} } = useRoleUsersListQuery(
		role.id,
		pagination,
		{
			search: search.debouncedValue,
		},
	);

	const onUnassignClick = useCallback(
		(userId: number) => {
			unassignUser({
				roleId: role.id,
				userId,
			});
		},
		[role.id, unassignUser],
	);

	return (
		<>
			<List.Layout>
				<List.Header className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<DebouncedSearch manager={search} className="w-full" />
						<ActionIcon
							onClick={openAssignRole}
							aria-label={t().admin.managers["assign-role"].Action}
						>
							<IoAddOutline />
						</ActionIcon>
					</div>
					<Pagination size="sm" {...pagination.control} />
				</List.Header>
				<List.VerticalContent>
					{users.map((user) => (
						<UserCard
							key={user.id}
							user={user}
							actions={[
								<ActionIcon
									variant="outline"
									key="remove"
									color="red"
									aria-label={commonInterpolated(
										(t) => t.expressions["Unassign-sth"],
										{ name: user.name },
									)}
									onClick={() => onUnassignClick(user.id)}
								>
									<IoIosRemoveCircleOutline />
								</ActionIcon>,
							]}
						/>
					))}
				</List.VerticalContent>
			</List.Layout>
			<Modal
				opened={assignRoleOpened}
				onClose={closeAssignRole}
				title={interpolated((t) => t.admin.managers["assign-role"].Title, {
					name: role.name,
				})}
			>
				<RoleUserAssign role={role} onSuccess={closeAssignRole} />
			</Modal>
		</>
	);
};
