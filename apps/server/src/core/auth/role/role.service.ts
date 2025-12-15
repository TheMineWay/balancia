import { RoleRepository } from "@core/auth/role/repositories/role.repository";
import {
	RoleAssignedEvent,
	RoleCreatedEvent,
	RolePermissionsUpdatedEvent,
	RoleUnassignedEvent,
	RoleUpdatedEvent,
} from "@core/auth/role/role.events";
import { UserAuthInfoCacheService } from "@core/cache/caches/user-auth-info-cache.service";
import { DATABASE_PROVIDERS } from "@database/database.provider";
import type {
	RoleSelect,
	RoleUpdate,
} from "@database/schemas/main/tables/identity/role.table";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import type {
	IdModel,
	PaginatedQuery,
	PaginatedResponse,
	Permission,
	RoleEditablePropsModel,
	RoleModel,
	SearchModel,
	UserModel,
} from "@shared/models";
import { EventService } from "src/events/event.service";

@Injectable()
export class RoleService {
	constructor(
		private readonly roleRepository: RoleRepository,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
		private readonly userAuthInfoCacheService: UserAuthInfoCacheService,
		private readonly eventService: EventService,
	) {}

	/**
	 * Retrieves all roles from the database
	 */
	async getAll() {
		return this.roleRepository.findAll();
	}

	/**
	 * Creates a new role with the provided data
	 */
	async create(role: RoleEditablePropsModel): Promise<{ id: IdModel } | null> {
		const [newRole] = await this.roleRepository.create(role);

		if (newRole) {
			this.eventService.emit(new RoleCreatedEvent({ roleId: newRole.id }));
			return newRole;
		}

		return null;
	}

	/**
	 * Updates an existing role with new data
	 */
	async update(id: RoleSelect["id"], role: RoleUpdate) {
		await this.roleRepository.update(id, role);

		// Emit an event after updating the role
		this.eventService.emit(new RoleUpdatedEvent({ roleId: id }));
	}

	/**
	 * Permanently deletes a role from the database
	 */
	async delete(id: RoleSelect["id"]) {
		return this.roleRepository.delete(id);
	}

	/**
	 * Retrieves all roles along with their permission statistics
	 */
	async getRolesWithPermissions() {
		return await this.roleRepository.findWithStatistics();
	}

	// MARK: Role users

	/**
	 * Assigns a role to a user within a database transaction and clears the authentication cache
	 */
	async assignRole(roleId: RoleModel["id"], userId: UserModel["id"]) {
		await this.databaseService.db.transaction(async (transaction) => {
			const userRole = await this.roleRepository.findByUserAndRole(
				userId,
				roleId,
				{ transaction },
			);
			if (userRole) return;

			return this.roleRepository.assignRole(roleId, userId, { transaction });
		});

		this.eventService.emit(new RoleAssignedEvent({ roleId, userId }));
	}

	/**
	 * Removes a role assignment from a user and clears the authentication cache
	 */
	async unassignRole(roleId: RoleModel["id"], userId: UserModel["id"]) {
		await this.roleRepository.unassignRole(roleId, userId);

		this.eventService.emit(new RoleUnassignedEvent({ roleId, userId }));
	}

	/**
	 * Retrieves a paginated and searchable list of users assigned to a specific role
	 */
	getRoleUsersList(
		roleId: number,
		pagination: PaginatedQuery,
		search: SearchModel,
	): Promise<PaginatedResponse<UserModel>> {
		return this.roleRepository.findRoleUsersList(roleId, pagination, search);
	}

	/**
	 * Updates the complete set of permissions assigned to a role, removing old ones and adding new ones
	 */
	async setRolePermissions(
		roleId: RoleModel["id"],
		permissions: Permission[],
	): Promise<void> {
		await this.databaseService.db.transaction(async (transaction) => {
			if (permissions.length === 0) {
				// If no permissions are provided, remove all existing permissions
				await this.roleRepository.deleteRolePermissionsByRole(roleId, {
					transaction,
				});
				return;
			}

			// Fetch BD permissions
			const dbPermissions = await this.roleRepository.findPermissions({
				transaction,
			});

			// Fetch assigned permissions
			const assignedRolePermissions =
				await this.roleRepository.findRolePermissions(roleId, { transaction });

			if (assignedRolePermissions.length > 0) {
				// Identify assigned permissions that are not present in the new permissions
				const toRemove = assignedRolePermissions.filter(
					(p) => !permissions.includes(p.code),
				);

				// Remove them
				await this.roleRepository.deleteRolePermissionsByRoleAndPermissions(
					roleId,
					toRemove.map((p) => p.id),
					{ transaction },
				);
			}

			// Identify permissions to add
			const toAdd = dbPermissions.filter(
				(p) =>
					permissions.includes(p.code) &&
					!assignedRolePermissions.find((rp) => rp.code === p.code),
			);

			// Add new permissions
			await this.roleRepository.addRolePermissions(
				roleId,
				toAdd.map((p) => p?.id),
				{
					transaction,
				},
			);
		});

		this.eventService.emit(new RolePermissionsUpdatedEvent({ roleId }));
	}

	/**
	 * Retrieves all permissions assigned to a specific role
	 */
	async getRolePermissions(roleId: RoleModel["id"]) {
		return this.roleRepository.findRolePermissions(roleId);
	}

	// MARK: Events

	@OnEvent(RolePermissionsUpdatedEvent.NAME)
	@OnEvent(RoleUnassignedEvent.NAME)
	@OnEvent(RoleAssignedEvent.NAME)
	onRoleAssignedOrUnassigned() {
		// Clear the user authentication info cache when a role is assigned or unassigned
		this.userAuthInfoCacheService.clearAll();
	}
}
