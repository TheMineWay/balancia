import { z } from "zod";
import { USER_SCHEMA } from "./user.model";

export const DB_USER_SCHEMA = USER_SCHEMA;

export type DbUserModel = z.infer<typeof DB_USER_SCHEMA>;
