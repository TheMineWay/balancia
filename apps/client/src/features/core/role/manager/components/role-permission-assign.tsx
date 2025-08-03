import type { RoleModel } from "@shared/models";

type Props = {
  role: RoleModel;
};

export const RolePermissionAssign: FC<Props> = ({ role }) => {
  return <div className="flex flex-col gap-2"></div>;
};
