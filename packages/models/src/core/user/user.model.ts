import { TIMESTAMPS_SCHEMA } from "@/utils";
import { ModelValues } from "@ts-types/model-values.type";
import { number, object, string, z } from "zod";

export const USER_MODEL_VALUES = {
  name: {
    minLength: 1,
    maxLength: 64,
  },
  lastName: {
    maxLength: 128,
  },
  username: {
    minLength: 4,
    maxLength: 32,
  },
  email: {
    maxLength: 128,
  },
  password: {
    minLength: 8,
    maxLength: 128,
  },
} satisfies ModelValues;

export const USER_SCHEMA = object({
  id: number(),
  username: string().min(USER_MODEL_VALUES.username.minLength),
  email: string().email().nullable().optional(),
  name: string(),
  lastName: string().optional(),
}).merge(TIMESTAMPS_SCHEMA);

export type UserModel = z.infer<typeof USER_SCHEMA>;

// Special export
export type UserModelId = UserModel["id"];
