import { number, object, string, z } from "zod";
import { TIMESTAMPS_SCHEMA } from "../utils";

export const USER_SCHEMA = object({
  id: number(),
  username: string(),
  name: string(),
  lastName: string().optional(),
}).merge(TIMESTAMPS_SCHEMA);

export type UserModel = z.infer<typeof USER_SCHEMA>;
