import { QueryOptions, Repository } from "@database/repository/core/repository";
import {
  UserInsert,
  userTable,
  UserUpdate,
} from "@database/schemas/main/tables/identity/user.table";
import { Injectable } from "@nestjs/common";
import { DbUserModel, PaginatedQuery, SearchModel } from "@shared/models";
import { asc, eq, inArray, like } from "drizzle-orm";

@Injectable()
export class UserRepository extends Repository {
  findByCode = async (code: string, options?: QueryOptions) =>
    (
      await this.query(options)
        .select()
        .from(userTable)
        .where(eq(userTable.code, code))
        .limit(1)
    )?.[0];

  findById = async (userId: DbUserModel["id"], options?: QueryOptions) =>
    (
      await this.query(options)
        .select()
        .from(userTable)
        .where(eq(userTable.id, userId))
        .limit(1)
    )?.[0];

  findAndCount = async (
    pagination: PaginatedQuery,
    { search }: SearchModel = { search: null },
    options?: QueryOptions,
  ) => {
    const query = this.query(options)
      .select()
      .from(userTable)
      .where(search ? like(userTable.name, `%${search}%`) : undefined)
      .orderBy(asc(userTable.id))
      .$dynamic();

    const { rows: items, count: total } = await this.paginated(
      pagination,
      query,
    );

    return {
      items,
      total,
    };
  };

  findByCodes = async (codes: string[], options?: QueryOptions) =>
    this.query(options)
      .select()
      .from(userTable)
      .where(inArray(userTable.code, codes));

  create = async (user: UserInsert, options?: QueryOptions) =>
    (
      await this.query(options).insert(userTable).values([user]).$returningId()
    )?.[0];

  updateById = (
    id: DbUserModel["id"],
    data: UserUpdate,
    options?: QueryOptions,
  ) =>
    this.query(options).update(userTable).set(data).where(eq(userTable.id, id));
}
