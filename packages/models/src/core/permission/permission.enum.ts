/**
 * It is recommended to define permissions as if they were small roles (for specific resources).
 * This way, you can easily assign multiple permissions to a user and manage access control more effectively.
 *
 * Example:
 * - `resource:use` - Allows a user to use the resource.
 */
export enum Permission {
  ADMIN = "admin",
}

// List of all permissions. Used on DB
export const PERMISSIONS = Object.values(Permission);
