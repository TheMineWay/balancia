import { TotpEnableRepository } from "@database/repository/core/totp-enable.repository";
import { TotpEnableInsert } from "@database/schemas/main/tables/totp-enable.table";
import { Injectable } from "@nestjs/common";
import { CONFIG } from "@shared/constants";
import { UserModelId } from "@shared/models";
import { add, isFuture } from "date-fns";
import { Secret, TOTP } from "otpauth";

@Injectable()
export class TotpService {
  constructor(private readonly totpEnableRepository: TotpEnableRepository) {}

  async getCurrentUserTotpEnable(userId: UserModelId) {
    const { totp, createdAt } = await this.totpEnableRepository.transaction(
      async (transaction) => {
        const totpEnableInfo = await this.totpEnableRepository.findByUserId(
          userId,
          { transaction },
        );

        if (totpEnableInfo) {
          const windowedCreatedAt = add(totpEnableInfo.createdAt, {
            minutes: CONFIG.totp.totpIdleConfigTimeout,
          });

          if (isFuture(windowedCreatedAt)) {
            // If we are still on validation time window, return code
            const totp = new TOTP({
              secret: totpEnableInfo.totpSecret,
              digits: CONFIG.totp.digits,
            });
            return {
              totp,
              createdAt: totpEnableInfo.createdAt,
            };
          } else {
            // Otherwise, remove existing code
            await this.totpEnableRepository.deleteByUserId(userId, {
              transaction,
            });
          }
        }

        const insertData: TotpEnableInsert = {
          userId,
          totpSecret: new Secret({ size: CONFIG.totp.secretByteLength }).base32,
        };

        await this.totpEnableRepository.create(insertData, { transaction });
        const { createdAt } = await this.totpEnableRepository.findByUserId(
          userId,
          { transaction },
        );

        const totp = new TOTP({
          secret: insertData.totpSecret,
          digits: CONFIG.totp.digits,
        });

        return {
          totp,
          createdAt,
        };
      },
    );

    const totpUri = totp.toString();
    return { totpUri, createdAt };
  }
}
