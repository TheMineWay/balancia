import { Module } from "@nestjs/common";
import { ContactsModule } from "src/features/social/contacts/contacts.module";

@Module({
	imports: [ContactsModule],
})
export class SocialModule {}
