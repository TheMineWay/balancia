import { ManagerLayout } from "@common/layouts/manager/manager-layout";
import { RolesTable } from "@core-fts/role/manager/components/roles-table";
import { Button } from "@mantine/core";

export const RoleManager: FC = () => {
  return (
    <ManagerLayout.Main>
      {/* Main actions */}
      <ManagerLayout.Actions>
        <Button></Button>
      </ManagerLayout.Actions>

      {/* Table */}
      <ManagerLayout.View>
        <RolesTable />
      </ManagerLayout.View>
    </ManagerLayout.Main>
  );
};
