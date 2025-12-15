import { Module } from "@nestjs/common";
import { SocialUserConfigModule } from "src/features/social/config/social-user-config.module";
import { ContactsModule } from "src/features/social/contacts/contacts.module";

@Module({
	imports: [ContactsModule, SocialUserConfigModule],
})
export class SocialModule {}
