import { TIMESTAMPS_SCHEMA } from "@/utils";
import { ModelValues } from "@ts-types/model-values.type";
import { z } from "zod";

export const ROLE_MODEL_VALUES = {
  name: {
    minLength: 1,
    maxLength: 64,
  },
} satisfies ModelValues;

export const ROLE_EDITABLE_PROPS_SCHEMA = z.object({
  id: z.number(),
  name: z
    .string()
    .min(ROLE_MODEL_VALUES.name.minLength)
    .max(ROLE_MODEL_VALUES.name.maxLength),
});
export type RoleEditablePropsModel = z.infer<typeof ROLE_EDITABLE_PROPS_SCHEMA>;

export const ROLE_SCHEMA = z.object({
  ...ROLE_EDITABLE_PROPS_SCHEMA.shape,
  ...TIMESTAMPS_SCHEMA.shape,
});
export type RoleModel = z.infer<typeof ROLE_SCHEMA>;
