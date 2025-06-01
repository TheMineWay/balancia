import { OidcModule } from "@core/api/auth/open-id-connect/oidc.module";
import { Global, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Global()
@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [OidcModule],
})
export class AuthModule {}
