import { QueryOptions, Repository } from "@database/repository/repository";
import {
	UserSocialConfigsSelect,
	userSocialConfigTable,
} from "@database/schemas/main/tables/social/user-social-config.table";
import { Injectable } from "@nestjs/common";
import { UserModelId } from "@shared/models";
import { eq } from "drizzle-orm";

@Injectable()
export class SocialUserConfigRepository extends Repository {
	async findByUserId(
		userId: UserModelId,
		options?: QueryOptions,
	): Promise<UserSocialConfigsSelect | null> {
		return (
			(
				await this.query(options)
					.select()
					.from(userSocialConfigTable)
					.where(eq(userSocialConfigTable.userId, userId))
			)?.[0] || null
		);
	}
}
