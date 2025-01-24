import { z } from "zod";

export const DATE_SCHEMA = z
  .union([z.string(), z.date()])
  .transform((value) => (typeof value === "string" ? new Date(value) : value));

export type DateModel = z.infer<typeof DATE_SCHEMA>;
