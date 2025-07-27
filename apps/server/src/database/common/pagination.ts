import type { MySqlSelect } from "drizzle-orm/mysql-core";

export const queryWithCount = async <T extends MySqlSelect>(
  qb: T,
): Promise<[Awaited<T>, number]> => {
  const result = await qb;
  // @ts-ignore hack to override internals (not the ideal way)
  qb.config.fields = { count: count() };
  // @ts-ignore
  qb.config.orderBy = [];
  const [total] = await qb;
  return [result, total.count];
};

export const withPagination = <T extends MySqlSelect>(
  qb: T,
  page: number,
  pageSize: number,
) => {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
};
