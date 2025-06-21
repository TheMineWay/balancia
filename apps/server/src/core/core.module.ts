import { UserModule } from "@core/api/user/user.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    /* User */
    UserModule,
  ],
})
export class CoreModule {}
