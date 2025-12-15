import { DATABASE_PROVIDERS } from "@database/database.provider";
import type { QueryOptions } from "@database/repository/repository";
import { ContactSelect } from "@database/schemas/main/tables/social/contact.table";
import { DatabaseService } from "@database/services/database.service";
import {
	BadRequestException,
	Inject,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import type {
	ContactCreateModel,
	ContactModel,
	PaginatedSearchModel,
	UserModelId,
} from "@shared/models";
import { EventService } from "src/events/event.service";
import {
	ContactCreatedEvent,
	ContactDeletedEvent,
	ContactUpdatedEvent,
} from "src/features/social/contacts/contacts.events";
import { ContactsRepository } from "src/features/social/contacts/repositories/contacts.repository";

@Injectable()
export class ContactsService {
	constructor(
		private readonly contactsRepository: ContactsRepository,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
		private readonly eventService: EventService,
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

	async create(userId: UserModelId, contact: ContactCreateModel) {
		const created = await this.contactsRepository.create({
			...contact,
			userId,
		});

		if (created)
			this.eventService.emit(new ContactCreatedEvent({ contact: created }));
		else throw new BadRequestException();

		return created;
	}

	async bulkCreate(userId: UserModelId, contacts: ContactCreateModel[]) {
		const createdContacts = await this.contactsRepository.bulkCreate(
			contacts.map((contact) => ({
				...contact,
				userId,
			})),
		);

		for (const contact of createdContacts) {
			this.eventService.emit(new ContactCreatedEvent({ contact }));
		}

		return createdContacts;
	}

	async delete(userId: UserModelId, contactId: ContactModel["id"]) {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkOwnership(userId, contactId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			const deleted = await this.contactsRepository.deleteById(contactId, {
				transaction,
			});

			this.eventService.emit(new ContactDeletedEvent({ contactId }));

			return deleted;
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
		contact: ContactCreateModel,
	) {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkOwnership(userId, contactId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			const updated = await this.contactsRepository.updateById(
				contactId,
				contact,
				{
					transaction,
				},
			);

			if (updated)
				this.eventService.emit(new ContactUpdatedEvent({ contact: updated }));

			return updated;
		});
	}
}

type CheckContactOwnershipResponse =
	| { isOwner: true; contact: ContactSelect }
	| { isOwner: false; contact: null };
