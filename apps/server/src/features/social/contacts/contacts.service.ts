import { DATABASE_PROVIDERS } from "@database/database.provider";
import type { QueryOptions } from "@database/repository/repository";
import { ContactSelect } from "@database/schemas/main/tables/social/contact.table";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type {
	ContactCreateModel,
	ContactModel,
	PaginatedSearchModel,
	UserModelId,
} from "@shared/models";
import { ContactsRepository } from "src/features/social/contacts/repositories/contacts.repository";

@Injectable()
export class ContactsService {
	constructor(
		private readonly contactsRepository: ContactsRepository,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
	) {}

	async checkOwnership(
		userId: UserModelId,
		contactId: ContactModel["id"],
		queryOptions?: QueryOptions,
	): Promise<CheckContactOwnershipResponse> {
		const contact = await this.contactsRepository.findByIdAndUserId(
			contactId,
			userId,
			queryOptions,
		);

		return {
			contact,
			isOwner: contact?.userId === userId,
		} as CheckContactOwnershipResponse;
	}

	async getUserContactById(
		userId: UserModelId,
		contactId: ContactModel["id"],
	): Promise<ContactModel> {
		const { isOwner, contact } = await this.checkOwnership(userId, contactId);
		if (!isOwner || !contact) throw new UnauthorizedException();

		return contact;
	}

	async create(userId: UserModelId, contact: Omit<ContactCreateModel, "code">) {
		return await this.contactsRepository.create({
			...contact,
			userId,
		});
	}

	async delete(userId: UserModelId, contactId: ContactModel["id"]) {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkOwnership(userId, contactId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			return await this.contactsRepository.deleteById(contactId, {
				transaction,
			});
		});
	}

	async findList(userId: UserModelId, paginatedSearch: PaginatedSearchModel) {
		return await this.contactsRepository.findPaginatedByUserId(
			userId,
			paginatedSearch,
		);
	}

	async update(
		userId: UserModelId,
		contactId: ContactModel["id"],
		{ code: contactCode, ...contact }: ContactCreateModel,
	) {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkOwnership(userId, contactId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			return await this.contactsRepository.updateById(
				contactId,
				{ ...contact, code: contactCode ? contactCode : undefined },
				{
					transaction,
				},
			);
		});
	}
}

type CheckContactOwnershipResponse =
	| { isOwner: true; contact: ContactSelect }
	| { isOwner: false; contact: null };
