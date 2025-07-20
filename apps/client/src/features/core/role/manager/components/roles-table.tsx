import { DatetimeRender } from "@common/components/date/components/datetime-render";
import { Table } from "@common/components/table/components/table";
import { useTable } from "@common/components/table/hooks/use-table";
import { useAdminRolesQuery } from "@core-fts/role/manager/api/use-admin-roles.query";
import { useTranslation } from "@i18n/use-translation";
import type { RoleModel } from "@shared/models";

type RoleTableData = RoleModel & {
  permissionsCount: number;
  usersCount: number;
};

export const RolesTable: FC = () => {
  const { data: { roles } = {} } = useAdminRolesQuery();

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
        label: commonT().models.fields["created-at"].Name,
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
    ],
    rowKey: "id",
  });
  return <Table table={table} />;
};
