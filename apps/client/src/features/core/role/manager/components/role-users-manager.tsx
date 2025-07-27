import { UserCard } from "@common/components/user/user-card";
import { usePagination } from "@common/hooks/use-pagination";
import { useRoleUsersListQuery } from "@core-fts/role/manager/api/use-role-users-list.query";
import { Pagination } from "@mantine/core";

import type { RoleModel } from "@shared/models";

type Props = {
  role: RoleModel;
};

export const RoleUsersManager: FC<Props> = ({ role }) => {
  const pagination = usePagination();
  const { data: { items: users = [] } = {} } = useRoleUsersListQuery(
    role.id,
    pagination
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <Pagination {...pagination.control} />
    </div>
  );
};
