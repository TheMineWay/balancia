import { Injectable } from "@nestjs/common";
import { UserModelId } from "@shared/models";
import { SocialUserConfigRepository } from "src/features/social/config/repository/social-user-config.repository";

@Injectable()
export class SocialUserConfigService {
	constructor(
		private readonly socialUserConfigRepository: SocialUserConfigRepository,
	) {}

	async getByUserId(userId: UserModelId) {
		return this.socialUserConfigRepository.findByUserId(userId);
	}
}
