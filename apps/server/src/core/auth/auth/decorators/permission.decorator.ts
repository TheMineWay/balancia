import { SetMetadata } from "@nestjs/common";
import type { Permission } from "@shared/models";

/**
 * Metadata key used for storing permission requirements on endpoints.
 */
export const PERMISSIONS_DECORATOR_KEY = "permissions";

/**
 * Decorator to specify required permissions for accessing an endpoint.
 * Guards will check if the user has all specified permissions.
 */
export const Permissions = (...permissions: Permission[]) =>
	SetMetadata(PERMISSIONS_DECORATOR_KEY, permissions);
