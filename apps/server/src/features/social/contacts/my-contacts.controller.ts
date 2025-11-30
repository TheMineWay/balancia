import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import { Controller, Param, ParseIntPipe } from "@nestjs/common";
import {
	getController,
	getParamName,
	type InferBodyDto,
	type InferQueryDto,
	type InferResponseDto,
	MY_CONTACTS_CONTROLLER,
} from "@shared/api-definition";
import type { UserModelId } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "src/decorators/validation/validated-body.decorator";
import { ValidatedQuery } from "src/decorators/validation/validated-query.decorator";
import { ContactsService } from "src/features/social/contacts/contacts.service";

@Controller(getController(MY_CONTACTS_CONTROLLER, {}))
export class MyContactsController {
	constructor(private readonly contactsService: ContactsService) {}

	@Endpoint(MY_CONTACTS_CONTROLLER, "getContactsList")
	async getContactsList(
		@UserId() userId: UserModelId,
		@ValidatedQuery(MY_CONTACTS_CONTROLLER, "getContactsList")
		query: InferQueryDto<typeof MY_CONTACTS_CONTROLLER, "getContactsList">,
	): Promise<
		InferResponseDto<typeof MY_CONTACTS_CONTROLLER, "getContactsList">
	> {
		return await this.contactsService.findList(userId, query);
	}

	@Endpoint(MY_CONTACTS_CONTROLLER, "getById")
	async getContactById(
		@UserId() userId: UserModelId,
		@Param(getParamName(MY_CONTACTS_CONTROLLER, "getById", "id"), ParseIntPipe)
		contactId: number,
	): Promise<InferResponseDto<typeof MY_CONTACTS_CONTROLLER, "getById">> {
		return await this.contactsService.getUserContactById(userId, contactId);
	}

	@Endpoint(MY_CONTACTS_CONTROLLER, "createContact")
	async createContact(
		@UserId() userId: UserModelId,
		@ValidatedBody(MY_CONTACTS_CONTROLLER, "createContact")
		body: InferBodyDto<typeof MY_CONTACTS_CONTROLLER, "createContact">,
	): Promise<InferResponseDto<typeof MY_CONTACTS_CONTROLLER, "createContact">> {
		await this.contactsService.create(userId, body);
	}

	@Endpoint(MY_CONTACTS_CONTROLLER, "updateContact")
	async updateContact(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(MY_CONTACTS_CONTROLLER, "deleteContact", "id"),
			ParseIntPipe,
		)
		contactId: number,
		@ValidatedBody(MY_CONTACTS_CONTROLLER, "updateContact")
		body: InferBodyDto<typeof MY_CONTACTS_CONTROLLER, "updateContact">,
	): Promise<InferResponseDto<typeof MY_CONTACTS_CONTROLLER, "updateContact">> {
		await this.contactsService.update(userId, contactId, body);
	}

	@Endpoint(MY_CONTACTS_CONTROLLER, "deleteContact")
	async deleteContact(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(MY_CONTACTS_CONTROLLER, "deleteContact", "id"),
			ParseIntPipe,
		)
		contactId: number,
	): Promise<InferResponseDto<typeof MY_CONTACTS_CONTROLLER, "deleteContact">> {
		await await this.contactsService.delete(userId, contactId);
	}

	@Endpoint(MY_CONTACTS_CONTROLLER, "bulkCreateContacts")
	async bulkCreateContacts(
		@UserId() userId: UserModelId,
		@ValidatedBody(MY_CONTACTS_CONTROLLER, "bulkCreateContacts")
		body: InferBodyDto<
			typeof MY_CONTACTS_CONTROLLER,
			"bulkCreateContacts"
		>,
	): Promise<InferResponseDto<typeof MY_CONTACTS_CONTROLLER, "bulkCreateContacts">> {
		await this.contactsService.bulkCreate(userId, body.contacts);
	}
}
