import { ManagerLayout } from "@common/layouts/manager/manager-layout";
import { RoleCreateManager } from "@core-fts/role/manager/components/role-create-manager";
import { RolesTable } from "@core-fts/role/manager/components/roles-table";
import { useTranslation } from "@i18n/use-translation";
import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoAddOutline } from "react-icons/io5";

export const RoleManager: FC = () => {
  const { t } = useTranslation("role");

  const [createOpened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ManagerLayout.Main>
        {/* Main actions */}
        <ManagerLayout.Actions>
          <Button leftSection={<IoAddOutline />} onClick={open}>
            {t().admin.managers.create.Action}
          </Button>
        </ManagerLayout.Actions>

        {/* Table */}
        <ManagerLayout.View>
          <RolesTable />
        </ManagerLayout.View>
      </ManagerLayout.Main>

      <Drawer
        position="right"
        opened={createOpened}
        onClose={close}
        title={t().admin.managers.create.Title}
      >
        <RoleCreateManager onSuccess={close} />
      </Drawer>
    </>
  );
};
