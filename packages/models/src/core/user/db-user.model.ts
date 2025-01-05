import { object, string, z } from "zod";
import { USER_SCHEMA } from "./user.model";

export const DB_USER_SCHEMA = USER_SCHEMA.merge(
  object({
    password: string(),
    totpSecret: string().optional().nullable(),
  })
);

export type DbUserModel = z.infer<typeof DB_USER_SCHEMA>;
