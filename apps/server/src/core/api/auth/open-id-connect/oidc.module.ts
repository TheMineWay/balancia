import { OidcService } from "@core/api/auth/open-id-connect/oidc.service";
import { Module } from "@nestjs/common";

@Module({
  providers: [OidcService],
  exports: [OidcService],
})
export class OidcModule {}
