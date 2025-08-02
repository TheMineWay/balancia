import { SelectSearch } from "@common/components/form/items/search/select-search";
import { useDebouncedSearch } from "@common/components/form/items/search/use-debounced-search";
import { usePagination } from "@common/hooks/use-pagination";
import { useAdminUserListQuery } from "@core-fts/auth/user/api/use-admin-user-list.query";
import { useTranslation } from "@i18n/use-translation";
import { Button } from "@mantine/core";
import type { RoleModel, UserModel } from "@shared/models";
import { useState } from "react";
import { LuUserCog } from "react-icons/lu";

type Props = {
  role: RoleModel;
  onSuccess?: CallableFunction;
};

export const RoleUserAssign: FC<Props> = ({ role }) => {
  const { t } = useTranslation("role");
  const pagination = usePagination({ initialPageSize: 100 });
  const search = useDebouncedSearch();

  const { data: { users = [] } = {} } = useAdminUserListQuery(pagination, {
    search: search.debouncedValue,
  });

  const [selectedUserId, setSelectedUserId] = useState<UserModel["id"] | null>(
    null
  );

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
        placeholder="Select a user DEMO"
      />
      <Button leftSection={<LuUserCog />}>
        {t().admin.managers["assign-role"].Action}
      </Button>
    </div>
  );
};
