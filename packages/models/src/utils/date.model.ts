import { z } from "zod";

export const DATE_SCHEMA = z
  .union([z.string(), z.number(), z.date()])
  .transform((value) =>
    ["string", "number"].includes(typeof value) ? new Date(value) : value
  );

export type DateModel = z.infer<typeof DATE_SCHEMA>;
