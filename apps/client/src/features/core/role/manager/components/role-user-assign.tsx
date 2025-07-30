import { useTranslation } from "@i18n/use-translation";
import { Button } from "@mantine/core";
import type { RoleModel } from "@shared/models";
import { LuUserCog } from "react-icons/lu";

type Props = {
  role: RoleModel;
  onSuccess?: CallableFunction;
};

export const RoleUserAssign: FC<Props> = ({ role }) => {
  const { t } = useTranslation("role");

  return (
    <div className="flex flex-col gap-2">
      <Button leftSection={<LuUserCog />}>
        {t().admin.managers["assign-role"].Action}
      </Button>
    </div>
  );
};
