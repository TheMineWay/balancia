import { Table } from "@common/components/table/components/table";
import { useTable } from "@common/components/table/hooks/use-table";
import { useAdminRolesQuery } from "@core-fts/role/manager/api/use-admin-roles.query";
import type { RoleModel } from "@shared/models";

export const RolesTable: FC = () => {
  const { data: { roles } = {} } = useAdminRolesQuery();

  const table = useTable<RoleModel>({
    data: roles,
    columns: [
      {
        label: "Role Name",
        accessorKey: "name",
      },
      {
        label: "Created at",
        accessorKey: "createdAt",
        render: (item) => <p>{item.createdAt.toString()}</p>,
      },
    ],
    rowKey: "id",
  });
  return <Table table={table} />;
};
