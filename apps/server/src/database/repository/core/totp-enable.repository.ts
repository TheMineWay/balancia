import { QueryOptions, Repository } from "@database/repository/core/repository";
import {
  TotpEnableInsert,
  totpEnableTable,
} from "@database/schemas/main/tables/totp-enable.table";
import { Injectable } from "@nestjs/common";
import { UserModelId } from "@shared/models";
import { eq } from "drizzle-orm";

@Injectable()
export class TotpEnableRepository extends Repository {
  findByUserId = async (userId: UserModelId, options?: QueryOptions) => {
    return (
      await this.query(options)
        .select()
        .from(totpEnableTable)
        .where(eq(totpEnableTable.userId, userId))
        .limit(1)
    )?.[0];
  };

  create = async (data: TotpEnableInsert, options?: QueryOptions) => {
    await this.query(options).insert(totpEnableTable).values([data]);
    return { userId: data.userId };
  };

  deleteByUserId = async (userId: UserModelId, options?: QueryOptions) => {
    return await this.query(options)
      .delete(totpEnableTable)
      .where(eq(totpEnableTable.userId, userId));
  };
}
