import type { WithChildren } from "@common/types/component/component.types";
import { useUserInfo } from "@providers/auth/user-info.context";
import type { Permission } from "@shared/models";

type ProtectedProps = {
  permissions: Permission[];
} & WithChildren;

export const Protected: FC<ProtectedProps> = ({ permissions, children }) => {
  const { permissions: userPermissions } = useUserInfo();

  console.log({ permissions, userPermissions });

  if (!permissions.every((p) => userPermissions.includes(p))) {
    return null;
  }

  return <>{children}</>;
};
