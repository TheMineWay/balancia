import { type QueryOptions, Repository } from "@database/repository/repository";
import {
	DEBT_TABLE_COLUMNS,
	type DebtInsert,
	type DebtSelect,
	type DebtUpdate,
	debtTable,
} from "@database/schemas/main/tables/debt/debt.table";
import {
	CONTACT_TABLE_COLUMNS,
	contactTable,
} from "@database/schemas/main/tables/social/contact.table";
import { Injectable } from "@nestjs/common";
import type {
	DebtListModel,
	DebtModel,
	PaginatedResponse,
	PaginatedSearchModel,
	UserModelId,
} from "@shared/models";
import { and, desc, eq, ilike, or } from "drizzle-orm";

@Injectable()
export class DebtsRepository extends Repository {
	async findById(
		debtId: DebtModel["id"],
		options?: QueryOptions,
	): Promise<DebtSelect | null> {
		return (
			(
				await this.query(options)
					.select()
					.from(debtTable)
					.where(eq(debtTable.id, debtId))
					.limit(1)
			)?.[0] ?? null
		);
	}

	async findListByUserId(
		userId: UserModelId,
		{ pagination, search: { search } }: PaginatedSearchModel,
		options?: QueryOptions,
	): Promise<PaginatedResponse<DebtListModel>> {
		const searchCondition = search
			? or(
					ilike(debtTable.reason, `%${search}%`),
					ilike(contactTable.name, `%${search}%`),
					ilike(contactTable.lastName, `%${search}%`),
					ilike(contactTable.email, `%${search}%`),
				)
			: undefined;

		const query = this.query(options)
			.select({
				...DEBT_TABLE_COLUMNS,
				debtor: CONTACT_TABLE_COLUMNS,
			})
			.from(debtTable)
			.where(and(eq(debtTable.userId, userId), searchCondition))
			.innerJoin(contactTable, eq(debtTable.debtorId, contactTable.id))
			.orderBy(desc(debtTable.notifiedAt))
			.$dynamic();

		const { rows: items, count: total } = await this.paginated(
			pagination,
			query,
		);

		return {
			items,
			total,
		};
	}

	async create(data: DebtInsert, options?: QueryOptions): Promise<DebtSelect> {
		return (
			await this.query(options).insert(debtTable).values(data).returning()
		)[0];
	}

	async updateById(
		debtId: DebtModel["id"],
		data: DebtUpdate,
		options?: QueryOptions,
	) {
		return await this.query(options)
			.update(debtTable)
			.set(data)
			.where(eq(debtTable.id, debtId));
	}

	async deleteById(debtId: DebtModel["id"], options?: QueryOptions) {
		return await this.query(options)
			.delete(debtTable)
			.where(eq(debtTable.id, debtId));
	}
}
