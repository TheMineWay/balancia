import { QueryOptions, Repository } from "@database/repository/repository";
import {
	CONTACT_TABLE_COLUMNS,
	type ContactInsert,
	type ContactUpdate,
	contactTable,
} from "@database/schemas/main/tables/social/contact.table";
import { Injectable } from "@nestjs/common";
import type {
	ContactModel,
	OwnedModel,
	PaginatedResponse,
	PaginatedSearchModel,
	UserModelId,
} from "@shared/models";
import { and, desc, eq, ilike, or } from "drizzle-orm";

@Injectable()
export class ContactsRepository extends Repository {
	async findPaginatedByUserId(
		userId: UserModelId,
		{ pagination, search }: PaginatedSearchModel,
		options?: QueryOptions,
	): Promise<PaginatedResponse<ContactModel>> {
		const searchCondition = search?.search
			? or(
					ilike(contactTable.name, `%${search.search}%`),
					ilike(contactTable.lastName, `%${search.search}%`),
					ilike(contactTable.email, `%${search.search}%`),
					ilike(contactTable.phone, `%${search.search}%`),
				)
			: undefined;

		const query = this.query(options)
			.select()
			.from(contactTable)
			.where(and(eq(contactTable.userId, userId), searchCondition))
			.orderBy(desc(contactTable.id))
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

	async findByIdAndUserId(
		contactId: ContactModel["id"],
		userId: UserModelId,
		options?: QueryOptions,
	): Promise<OwnedModel<ContactModel> | null> {
		return (
			(
				await this.query(options)
					.select()
					.from(contactTable)
					.where(
						and(
							eq(contactTable.id, contactId),
							eq(contactTable.userId, userId),
						),
					)
					.limit(1)
			)?.[0] ?? null
		);
	}

	async deleteById(contactId: ContactModel["id"], options?: QueryOptions) {
		return await this.query(options)
			.delete(contactTable)
			.where(eq(contactTable.id, contactId));
	}

	async create(contact: ContactInsert, options?: QueryOptions) {
		const newContact = { ...contact };
		if (!newContact.code) delete newContact.code;
		return (
			(
				await this.query(options)
					.insert(contactTable)
					.values(newContact)
					.returning()
			)?.[0] || null
		);
	}

	async bulkCreate(contacts: ContactInsert[], options?: QueryOptions) {
		const cleanedContacts = contacts.map((contact) => {
			const newContact = { ...contact };
			if (!newContact.code) delete newContact.code;
			return newContact;
		});

		return await this.query(options)
			.insert(contactTable)
			.values(cleanedContacts)
			.returning(CONTACT_TABLE_COLUMNS);
	}

	async updateById(
		contactId: ContactModel["id"],
		contact: ContactUpdate,
		options?: QueryOptions,
	) {
		return (
			(
				await this.query(options)
					.update(contactTable)
					.set(contact)
					.where(eq(contactTable.id, contactId))
					.returning()
			)?.[0] ?? null
		);
	}
}
