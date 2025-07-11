import { TIMESTAMPS_SCHEMA } from "@/utils";
import { ModelValues } from "@ts-types/model-values.type";
import { z } from "zod";

export const ROLE_MODEL_VALUES = {
  name: {
    minLength: 1,
    maxLength: 64,
  },
} satisfies ModelValues;

export const ROLE_SCHEMA = z
  .object({
    id: z.number(),
    name: z
      .string()
      .min(ROLE_MODEL_VALUES.name.minLength)
      .max(ROLE_MODEL_VALUES.name.maxLength),
  })
  .merge(TIMESTAMPS_SCHEMA);

export type Role = z.infer<typeof ROLE_SCHEMA>;
