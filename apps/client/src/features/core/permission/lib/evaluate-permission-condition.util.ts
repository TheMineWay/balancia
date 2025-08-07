import type { PermissionCondition } from "@core-fts/permission/types/permission-condition.type";
import type { Permission } from "@shared/models";

/**
 * Evaluate wether the user has the required permissions based on the provided condition.
 */
export const evaluatePermissionCondition = (
	userPermissions: Permission[],
	condition: PermissionCondition,
): boolean => {
	const or =
		condition.type === "simple" ? [condition.permissions] : condition.or;

	return or.some((permissions) =>
		permissions.every((p) => userPermissions.includes(p)),
	);
};
