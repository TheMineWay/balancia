import { QueryOptions, Repository } from "@database/repository/core/repository";
import {
  UserInsert,
  usersTable,
} from "@database/schemas/main/tables/users.table";
import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

@Injectable()
export class UserRepository extends Repository {
  findByUsername = async (username: string, options?: QueryOptions) =>
    (
      await this.query(options)
        .select()
        .from(usersTable)
        .where(eq(usersTable.username, username))
        .limit(1)
    )?.[0];

  findById = async (options?: QueryOptions) =>
    (
      await this.query(options)
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, 1))
        .limit(1)
    )?.[0];

  create = async (user: UserInsert, options?: QueryOptions) =>
    (
      await this.query(options).insert(usersTable).values([user]).$returningId()
    )?.[0];
}
