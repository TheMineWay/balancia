import { Module } from "@nestjs/common";
import { ContactsService } from "src/features/social/contacts/contacts.service";
import { MyContactsController } from "src/features/social/contacts/my-contacts.controller";
import { ContactsRepository } from "src/features/social/contacts/repositories/contacts.repository";

@Module({
	controllers: [MyContactsController],
	providers: [ContactsService, ContactsRepository],
	exports: [ContactsService],
})
export class ContactsModule {}
