import { z } from "zod";

/**
 * Schema for date values that can be represented as a string, number, or Date object.
 * It transforms string and number inputs into a Date object.
 */
export const DATE_SCHEMA = z
  .union([z.string(), z.number(), z.date()])
  .transform((value) =>
    ["string", "number"].includes(typeof value)
      ? new Date(value)
      : (value as Date)
  );

export type DateModel = z.infer<typeof DATE_SCHEMA>;
