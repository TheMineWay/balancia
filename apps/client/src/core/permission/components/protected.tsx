import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { evaluatePermissionCondition } from "@core/permission/lib/evaluate-permission-condition.util";
import type { PermissionCondition } from "@core/permission/types/permission-condition.type";
import { useUserInfo } from "@providers/auth/user-info.context";
import { useMemo } from "react";

type ProtectedProps = {
	condition: PermissionCondition;
} & WithChildren;

/**
 * Permission-based component wrapper that conditionally renders children.
 * Only displays content if the user meets the specified permission condition.
 */
export const Protected: FC<ProtectedProps> = ({ condition, children }) => {
	const { permissions: userPermissions } = useUserInfo();

	const isAuthorized = useMemo(
		() => evaluatePermissionCondition(userPermissions, condition),
		[condition, userPermissions],
	);

	if (!isAuthorized) {
		return null;
	}

	return <>{children}</>;
};
