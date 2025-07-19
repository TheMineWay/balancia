import type z from "zod";

export type InferDto<T extends object> = T extends undefined ? never : T;

/* DTOs */
export type InferResponseDto<T> = T extends {
  responseDto: infer D extends z.ZodTypeAny;
}
  ? z.infer<D>
  : void;

export type InferBodyDto<T> = T extends {
  bodyDto: infer D extends z.ZodTypeAny;
}
  ? z.infer<D>
  : void;

export type InferQueryDto<T> = T extends {
  queryDto: infer D extends z.ZodTypeAny;
}
  ? z.infer<D>
  : void;
