import { SetMetadata } from "@nestjs/common";
import type { Permission } from "@shared/models";

export const PERMISSIONS_DECORATOR_KEY = "permissions";
export const Permissions = (...permissions: Permission[]) =>
	SetMetadata(PERMISSIONS_DECORATOR_KEY, permissions);
