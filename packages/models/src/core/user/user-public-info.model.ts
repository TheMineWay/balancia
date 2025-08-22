import { USER_SCHEMA } from "@/core/user/user.model";
import z from "zod";

const INFO = USER_SCHEMA.pick({ id: true, name: true });

/**
 * Schema for public user information.
 * This should be used when exposing others user information to another user.
 */
export const USER_PUBLIC_INFO_SCHEMA = z.object({
	...INFO.shape,
	avatarUrl: z.url().nullable().default(null),
});

export type UserPublicInfoModel = z.infer<typeof USER_PUBLIC_INFO_SCHEMA>;
