import { DebouncedSearch } from "@common/components/form/items/search/debounced-search";
import { useDebouncedSearch } from "@common/components/form/items/search/use-debounced-search";
import { UserCard } from "@common/components/user/user-card";
import { usePagination } from "@common/hooks/use-pagination";
import { useRoleUserUnassignMutation } from "@core-fts/role/manager/api/role-user/use-role-user-unassign.mutation";
import { useRoleUsersListQuery } from "@core-fts/role/manager/api/role-user/use-role-users-list.query";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Pagination } from "@mantine/core";
import type { RoleModel } from "@shared/models";
import { useCallback } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";

type Props = {
  role: RoleModel;
};

export const RoleUsersManager: FC<Props> = ({ role }) => {
  const { interpolated: commonInterpolated } = useTranslation("common");
  const pagination = usePagination();
  const { mutate: unassignUser } = useRoleUserUnassignMutation();

  const search = useDebouncedSearch();

  const { data: { items: users = [] } = {} } = useRoleUsersListQuery(
    role.id,
    pagination,
    {
      search: search.debouncedValue,
    }
  );

  const onUnassignClick = useCallback(
    (userId: number) => {
      unassignUser({
        roleId: role.id,
        userId,
      });
    },
    [role.id]
  );

  return (
    <div className="flex flex-col gap-2">
      <DebouncedSearch manager={search} />
      <div className="flex flex-col gap-1">
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
                  { name: user.name }
                )}
                onClick={() => onUnassignClick(user.id)}
              >
                <IoIosRemoveCircleOutline />
              </ActionIcon>,
            ]}
          />
        ))}
      </div>
      <Pagination {...pagination.control} />
    </div>
  );
};
