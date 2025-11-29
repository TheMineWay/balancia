import { Module } from "@nestjs/common";
import { SocialUserConfigModule } from "src/features/social/config/social-user-config.module";
import { ContactsService } from "src/features/social/contacts/contacts.service";
import { MyContactsController } from "src/features/social/contacts/my-contacts.controller";
import { ContactsRepository } from "src/features/social/contacts/repositories/contacts.repository";

@Module({
	controllers: [MyContactsController],
	providers: [ContactsService, ContactsRepository],
	exports: [ContactsService],
	imports: [SocialUserConfigModule],
})
export class ContactsModule {}
