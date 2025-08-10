import { UserRepository } from "@core/auth/user/repositories/user.repository";
import {
	UserCreatedEvent,
	UserUpdatedEvent,
} from "@core/auth/user/user.events";
import { UserCacheService } from "@core/cache/caches/user-cache.service";
import { QueryOptions } from "@database/repository/repository";
import {
	UserInsert,
	UserUpdate,
} from "@database/schemas/main/tables/identity/user.table";
import { Injectable } from "@nestjs/common";
import {
	DbUserModel,
	PaginatedQuery,
	SearchModel,
	UserModel,
} from "@shared/models";
import { EventService } from "src/events/event.service";

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userCacheService: UserCacheService,
		private readonly eventService: EventService,
	) {}

	async getByCode(code: string) {
		return this.userCacheService.getByCode(
			code,
			this.userRepository.findByCode,
		);
	}

	getById = async (userId: DbUserModel["id"]) => {
		return this.userCacheService.getById(userId, this.userRepository.findById);
	};

	getList = async (pagination: PaginatedQuery, search: SearchModel) => {
		return this.userRepository.findAndCount(pagination, search);
	};

	updateById = async (
		userId: DbUserModel["id"],
		userData: UserUpdate,
		options?: QueryOptions,
	) => {
		await this.userRepository.updateById(userId, userData, options);
		this.eventService.emit(new UserUpdatedEvent({ userId }));
	};

	create = async (data: UserInsert) => {
		const user = await this.userRepository.create(data);

		this.eventService.emit(new UserCreatedEvent({ userId: user.id }));
		return user;
	};

	findOrCreateByCode = async (
		code: UserModel["code"],
		data: Omit<UserInsert, "code">,
	) => {
		const user = await this.getByCode(code);
		if (user) return user;

		return await this.create({ code, ...data });
	};

	syncUsers = async (usersData: UserInsert[], options?: QueryOptions) => {
		const users = await this.userRepository.findByCodes(
			usersData.map((u) => u.code),
			options,
		);

		for (const user of users) {
			const data = usersData.find((u) => u.code === user.code);

			// If there is no user, do not integrate
			if (!data) continue;

			// If the data is the same, do not update
			if (
				data.name === user.name &&
				data.username === user.username &&
				data.email === user.email
			)
				continue;

			await this.updateById(user.id, data, options);
		}
	};
}
