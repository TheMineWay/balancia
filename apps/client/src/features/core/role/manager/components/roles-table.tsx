import { DatetimeRender } from "@common/components/date/components/datetime-render";
import { Table } from "@common/components/table/components/table";
import { useTable } from "@common/components/table/hooks/use-table";
import { useAdminRolesWithStatsQuery } from "@core-fts/role/manager/api/use-admin-roles-with-stats.query";
import { useTranslation } from "@i18n/use-translation";
import { Button, Space } from "@mantine/core";
import type { RoleModel } from "@shared/models";
import { IoPencil, IoTrash } from "react-icons/io5";

type RoleTableData = RoleModel & {
  permissionsCount: number;
  usersCount: number;
};

type Props = {
  onEdit?: (role: RoleModel) => void;
  onDelete?: (role: RoleModel) => void;
  isDeleting?: boolean;
};

export const RolesTable: FC<Props> = ({
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  const { data: { roles } = {} } = useAdminRolesWithStatsQuery();

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
      {
        label: "",
        render: (row) => (
          <Space>
            {onEdit && (
              <Button leftSection={<IoPencil />} onClick={() => onEdit(row)} />
            )}
            {onDelete && (
              <Button
                loading={isDeleting}
                leftSection={<IoTrash />}
                onClick={() => onDelete(row)}
              />
            )}
          </Space>
        ),
      },
    ],
    rowKey: "id",
  });
  return <Table table={table} />;
};
