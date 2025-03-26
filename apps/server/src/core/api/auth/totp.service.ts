import { UserService } from "@core/api/user/user.service";
import { TotpEnableRepository } from "@database/repository/core/totp-enable.repository";
import { TotpEnableInsert } from "@database/schemas/main/tables/totp-enable.table";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CONFIG } from "@shared/constants";
import { UserModelId } from "@shared/models";
import { add, addMinutes, isFuture, isPast } from "date-fns";
import { Secret, TOTP } from "otpauth";

@Injectable()
export class TotpService {
  constructor(
    private readonly totpEnableRepository: TotpEnableRepository,
    private readonly userService: UserService,
  ) {}

  /* Config */
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

  async validateCurrentUserTotpEnable(userId: UserModelId, code: string) {
    await this.totpEnableRepository.transaction(async (transaction) => {
      const current = await this.totpEnableRepository.findByUserId(userId, {
        transaction,
      });

      /**
       * If there is no active config or it is expired, return not found
       */
      if (
        !current ||
        isPast(addMinutes(current.createdAt, CONFIG.totp.totpIdleConfigTimeout))
      )
        throw new NotFoundException();

      const totp = new TOTP({
        secret: current.totpSecret,
        digits: CONFIG.totp.digits,
      });

      const serverCode = totp.generate();

      if (serverCode !== code) throw new ForbiddenException();

      // Code validated

      await this.totpEnableRepository.deleteByUserId(userId, { transaction });
      await this.userService.updateById(userId, {
        totpSecret: current.totpSecret,
      });
    });
  }
}
