import { Table } from "@common/components/table/components/table";
import { useTable } from "@common/components/table/hooks/use-table";
import { useAdminRolesQuery } from "@core-fts/role/manager/api/use-admin-roles.query";
import { useTranslation } from "@i18n/use-translation";
import type { RoleModel } from "@shared/models";

export const RolesTable: FC = () => {
  const { data: { roles } = {} } = useAdminRolesQuery();

  const { t: commonT } = useTranslation("common");
  const { t } = useTranslation("role");

  const table = useTable<RoleModel>({
    data: roles,
    columns: [
      {
        label: t().models.role.fields.name.Name,
        accessorKey: "name",
      },
      {
        label: commonT().models.fields["created-at"].Name,
        accessorKey: "createdAt",
        render: (item) => <p>{item.createdAt.toString()}</p>,
      },
      {
        label: t().admin.table.columns.permissions.Label,
        render: () => <></>,
      },
    ],
    rowKey: "id",
  });
  return <Table table={table} />;
};
