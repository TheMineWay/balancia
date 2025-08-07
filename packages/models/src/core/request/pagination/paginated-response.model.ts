import z from "zod";

export const getPaginatedResponse = <T extends z.ZodType>(schema: T) =>
  z.object({
    total: z.number().default(0),
    items: z.array(schema),
  });

export type PaginatedResponse<T> = {
  total: number;
  items: T[];
};
