import { ENV } from "@constants/conf/env.constant";
import { DATABASE_PROVIDERS } from "@database/database.provider";
import { permissionTable } from "@database/schemas/main.schema";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable } from "@nestjs/common";
import {
	HealthCheckService,
	HealthIndicatorService,
	MemoryHealthIndicator,
} from "@nestjs/terminus";
import axios from "axios";

@Injectable()
export class HealthService {
	constructor(
		private readonly healthIndicatorService: HealthIndicatorService,
		private readonly health: HealthCheckService,
		private readonly memory: MemoryHealthIndicator,
		@Inject(DATABASE_PROVIDERS.main)
		protected readonly databaseService: DatabaseService,
	) {}

	async getHealth() {
		return this.health.check([
			() => this.memory.checkHeap("memory_heap", 150 * 1024 * 1024), // 150MB
			() => this.memory.checkRSS("memory_rss", 300 * 1024 * 1024), // 300MB
			() => this.databaseStatus(),
			() => this.externalAuthServiceStatus(),
		]);
	}

	/* Internals */
	private async databaseStatus() {
		const indicator = this.healthIndicatorService.check("main_database");

		try {
			await this.databaseService.db.select().from(permissionTable).limit(1);
			return indicator.up();
		} catch (error) {
			return indicator.down((error as Error).message);
		}
	}

	private async externalAuthServiceStatus() {
		const indicator = this.healthIndicatorService.check(
			"external_auth_service",
		);

		try {
			await axios.get(ENV.oidc.host);
			return indicator.up();
		} catch (error) {
			return indicator.down((error as Error).message);
		}
	}
}
