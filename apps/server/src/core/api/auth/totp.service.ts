import { TotpEnableRepository } from "@database/repository/core/totp-enable.repository";
import { TotpEnableInsert } from "@database/schemas/main/tables/totp-enable.table";
import { Injectable } from "@nestjs/common";
import { UserModelId } from "@shared/models";
import { Secret, TOTP } from "otpauth";

@Injectable()
export class TotpService {
  constructor(private readonly totpEnableRepository: TotpEnableRepository) {}

  async getCurrentUserTotpEnable(userId: UserModelId) {
    const totp = await this.totpEnableRepository.transaction(
      async (transaction) => {
        const totpEnableInfo = await this.totpEnableRepository.findByUserId(
          userId,
          { transaction },
        );

        if (totpEnableInfo)
          return new TOTP({ secret: totpEnableInfo.totpSecret });

        const insertData: TotpEnableInsert = {
          userId,
          totpSecret: new Secret({ size: 32 }).base32,
        };

        await this.totpEnableRepository.create(insertData, { transaction });

        return new TOTP({ secret: insertData.totpSecret });
      },
    );

    const totpUri = totp.toString();
    return { totpUri };
  }
}
