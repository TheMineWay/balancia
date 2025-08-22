import { USER_SCHEMA } from "@/core/user/user.model";
import z from "zod";

const PUBLIC_USER_INFO = USER_SCHEMA.pick({ id: true, name: true });

/**
 * Schema for public user information.
 * This should be used when exposing others user information to another user.
 */
export const PUBLIC_USER_SCHEMA = z.object({
	...PUBLIC_USER_INFO.shape,
	avatarUrl: z.url().nullable().default(null),
});

export type PublicUserModel = z.infer<typeof PUBLIC_USER_SCHEMA>;
