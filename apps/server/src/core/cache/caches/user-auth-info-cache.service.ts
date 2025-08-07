import { ENV } from "@constants/conf/env.constant";
import { CacheService } from "@core/cache/cache.abstract";
import { Injectable } from "@nestjs/common";
import { Permission, RoleModel, UserModel } from "@shared/models";
import { Cacheable } from "cacheable";

@Injectable()
export class UserAuthInfoCacheService extends CacheService {
	constructor() {
		super(new Cacheable({ ttl: ENV.cache.userAuthInfo }));
	}

	async getById(
		userId: UserModel["id"],
		fetchInfo: (userId: UserModel["id"]) => Promise<UserAuthInfoCacheData>,
	) {
		return await this.get<UserAuthInfoCacheData>(
			userId.toString(),
			async () => await fetchInfo(userId),
		);
	}
}

export type UserAuthInfoCacheData = {
	permissions: Permission[];
	roles: RoleModel[];
};
