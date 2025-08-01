import { SelectSearch } from "@common/components/form/items/search/select-search";
import { usePagination } from "@common/hooks/use-pagination";
import { useAdminUserListQuery } from "@core-fts/auth/user/api/use-admin-user-list.query";
import { useTranslation } from "@i18n/use-translation";
import { Button } from "@mantine/core";
import type { RoleModel } from "@shared/models";
import { useState } from "react";
import { LuUserCog } from "react-icons/lu";

const DEMO = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
  { label: "Elderberry", value: "elderberry" },
  { label: "Fig", value: "fig" },
  { label: "Grape", value: "grape" },
  { label: "Honeydew", value: "honeydew" },
  { label: "Indian Fig", value: "indian_fig" },
  { label: "Jackfruit", value: "jackfruit" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Lemon", value: "lemon" },
  { label: "Mango", value: "mango" },
  { label: "Nectarine", value: "nectarine" },
  { label: "Orange", value: "orange" },
  { label: "Papaya", value: "papaya" },
  { label: "Quince", value: "quince" },
  { label: "Raspberry", value: "raspberry" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Tangerine", value: "tangerine" },
  { label: "Ugli Fruit", value: "ugli_fruit" },
  { label: "Vanilla Bean", value: "vanilla_bean" },
  { label: "Watermelon", value: "watermelon" },
  { label: "Xigua", value: "xigua" },
  { label: "Yellow Passion Fruit", value: "yellow_passion_fruit" },
  { label: "Zucchini", value: "zucchini" }, // technically a fruit!
  { label: "Cantaloupe", value: "cantaloupe" },
  { label: "Blackberry", value: "blackberry" },
  { label: "Cranberry", value: "cranberry" },
  { label: "Gooseberry", value: "gooseberry" },
];

type Props = {
  role: RoleModel;
  onSuccess?: CallableFunction;
};

export const RoleUserAssign: FC<Props> = ({ role }) => {
  const { t } = useTranslation("role");
  const pagination = usePagination();
  const [search, setSearch] = useState<string | null>(null);

  const { data: { users = [] } = {} } = useAdminUserListQuery(
    pagination,
    search
  );

  return (
    <div className="flex flex-col gap-2">
      <SelectSearch
        data={users.map((user) => ({
          label: user.name,
          value: user.id.toString(),
        }))}
        pagination={pagination}
        search={search}
        setSearch={setSearch}
      />
      <Button leftSection={<LuUserCog />}>
        {t().admin.managers["assign-role"].Action}
      </Button>
    </div>
  );
};
