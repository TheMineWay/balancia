import { TIMESTAMPS_SCHEMA } from "@/utils";
import { ModelValues } from "@ts-types/model-values.type";
import { z } from "zod";

export const ROLE_MODEL_VALUES = {
  name: {
    minLength: 1,
    maxLength: 64,
  },
} satisfies ModelValues;

const BASE_ROLE_SCHEMA = z.object({
  id: z.number(),
  name: z
    .string()
    .min(ROLE_MODEL_VALUES.name.minLength)
    .max(ROLE_MODEL_VALUES.name.maxLength),
});

export const CREATE_ROLE_SCHEMA = BASE_ROLE_SCHEMA.omit({ id: true });
export type RoleCreateModel = z.infer<typeof CREATE_ROLE_SCHEMA>;

export const UPDATE_ROLE_SCHEMA = CREATE_ROLE_SCHEMA.partial();
export type RoleUpdateModel = z.infer<typeof UPDATE_ROLE_SCHEMA>;

export const ROLE_SCHEMA = z.object({
  ...BASE_ROLE_SCHEMA.shape,
  ...TIMESTAMPS_SCHEMA.shape,
});
export type RoleModel = z.infer<typeof ROLE_SCHEMA>;
