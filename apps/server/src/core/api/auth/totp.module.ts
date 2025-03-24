import { TotpService } from "@core/api/auth/totp.service";
import { TotpEnableRepository } from "@database/repository/core/totp-enable.repository";
import { Module } from "@nestjs/common";

@Module({
  providers: [TotpService, TotpEnableRepository],
  exports: [TotpService],
})
export class TotpModule {}
