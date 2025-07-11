import { QueryOptions, Repository } from "@database/repository/core/repository";
import {
  UserInsert,
  userTable,
  UserUpdate,
} from "@database/schemas/main/tables/identity/user.table";
import { Injectable } from "@nestjs/common";
import { DbUserModel } from "@shared/models";
import { eq } from "drizzle-orm";

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
