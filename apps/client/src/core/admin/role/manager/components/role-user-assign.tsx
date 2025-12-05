import { SelectSearch } from "@common/extended-ui/form/components/search/select-search";
import { useDebouncedSearch } from "@common/extended-ui/form/components/search/use-debounced-search";
import { useRoleUserAssignMutation } from "@core/admin/role/manager/api/role-user/use-role-user-assign.mutation";
import { useAdminUserListQuery } from "@core/auth/user/api/use-admin-user-list.query";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useTranslation } from "@i18n/use-translation";
import { Button } from "@mantine/core";
import { GLOBAL_CONFIGS } from "@shared/constants";
import type { RoleModel, UserModel } from "@shared/models";
import { useCallback, useState } from "react";
import { LuUserCog } from "react-icons/lu";

type Props = {
	role: RoleModel;
	onSuccess?: CallableFunction;
};

export const RoleUserAssign: FC<Props> = ({ role, onSuccess }) => {
	const { t } = useTranslation("role");
	const pagination = usePagination({
		initialPageSize: GLOBAL_CONFIGS.PAGINATION.DEFAULT_PAGE_SIZE,
	});
	const search = useDebouncedSearch();

	const { data: { users = [] } = {} } = useAdminUserListQuery(pagination, {
		search: search.debouncedValue,
	});
	const { mutate: assignRole, isPending: isAssigning } =
		useRoleUserAssignMutation();

	const [selectedUserId, setSelectedUserId] = useState<UserModel["id"] | null>(
		null,
	);

	const onAssignClick = useCallback(() => {
		if (selectedUserId === null) return;
		assignRole(
			{
				roleId: role.id,
				userId: selectedUserId,
			},
			{
				onSuccess: () => onSuccess?.(),
			},
		);
	}, [selectedUserId, assignRole, role.id, onSuccess]);

	return (
		<div className="flex flex-col gap-2">
			<SelectSearch
				data={users.map((user) => ({
					label: user.name,
					value: user.id,
				}))}
				search={search}
				value={selectedUserId}
				setValue={setSelectedUserId}
				getKey={(item) => item}
			/>
			<Button
				leftSection={<LuUserCog />}
				loading={isAssigning}
				onClick={onAssignClick}
			>
				{t().admin.managers["assign-role"].Action}
			</Button>
		</div>
	);
};
