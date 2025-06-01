import { UserProfileModule } from "@core/api/user/profile/user-profile.module";
import { UserModule } from "@core/api/user/user.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    /* User */
    UserModule,
    UserProfileModule,
  ],
})
export class CoreModule {}
