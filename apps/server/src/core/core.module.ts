import { AuthModule } from "@core/api/auth/auth.module";
import { UserModule } from "@core/api/user/user.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [AuthModule, UserModule],
})
export class CoreModule {}
