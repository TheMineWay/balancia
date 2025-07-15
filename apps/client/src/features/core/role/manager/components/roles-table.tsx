import { Table } from "@common/components/table/components/table";
import { useTable } from "@common/components/table/hooks/use-table";
import type { RoleModel } from "@shared/models";

export const RolesTable: FC = () => {
  const table = useTable<RoleModel>({
    data: [
      {
        id: 1,
        name: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    columns: [
      {
        label: "Role Name",
        accessorKey: "name",
      },
      {
        label: "Created at",
        accessorKey: "createdAt",
      },
    ],
  });
  return <Table table={table} />;
};
