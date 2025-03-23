import { AuthModule } from "@core/api/auth/auth.module";
import { UserProfileModule } from "@core/api/user/profile/user-profile.module";
import { UserModule } from "@core/api/user/user.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    /* Utilities */
    AuthModule,

    /* User */
    UserModule,
    UserProfileModule,
  ],
})
export class CoreModule {}
