import { type QueryOptions, Repository } from "@database/repository/repository";
import {
	type UserInsert,
	type UserUpdate,
	userTable,
} from "@database/schemas/main/tables/identity/user.table";
import { Injectable } from "@nestjs/common";
import type { DbUserModel, PaginatedQuery, SearchModel } from "@shared/models";
import { asc, eq, ilike, inArray } from "drizzle-orm";

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
			.where(search ? ilike(userTable.name, `%${search}%`) : undefined)
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
			await this.query(options)
				.insert(userTable)
				.values([user])
				.returning({ id: userTable.id })
		)?.[0];

	updateById = (
		id: DbUserModel["id"],
		data: UserUpdate,
		options?: QueryOptions,
	) =>
		this.query(options).update(userTable).set(data).where(eq(userTable.id, id));
}
