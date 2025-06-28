import { TIMESTAMPS_SCHEMA } from "@/utils";
import { ModelValues } from "@ts-types/model-values.type";
import { number, object, string, z } from "zod";

export const USER_MODEL_VALUES = {
  code: {
    minLength: 32,
    maxLength: 64,
  },
} satisfies ModelValues;

export const USER_SCHEMA = object({
  id: number(),
  code: string()
    .min(USER_MODEL_VALUES.code.minLength)
    .max(USER_MODEL_VALUES.code.maxLength),
}).merge(TIMESTAMPS_SCHEMA);

export type UserModel = z.infer<typeof USER_SCHEMA>;

// Special export
export type UserModelId = UserModel["id"];
