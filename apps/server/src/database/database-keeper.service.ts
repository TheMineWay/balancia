import { ENV } from "@constants/conf/env.constant";
import { isMasterServer } from "@core/__lib__/global.utils";
import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class DatabaseKeeperService {
	private readonly logger = new Logger("DB Keeper");

	constructor() {
		if (ENV.database.refreshMaterializedViewsOnStartup && isMasterServer()) {
			this.refreshAll();
		}
	}

	/**
	 * Refresh all materialized views
	 */
	async refreshAll() {
		this.logger.log("Refreshing all materialized views...");
		// Invoke materialized views refresh

		this.logger.log("All materialized views refreshed.");
	}

	// #region Materialized Views

	/**
	 * Cron job to refresh materialized views periodically
	 */
	@Cron(ENV.database.materializedViewsDefaultRefreshCron)
	updateMaterializedViews() {
		if (!isMasterServer()) return;
		this.refreshAll();
	}

	// #endregion
}
