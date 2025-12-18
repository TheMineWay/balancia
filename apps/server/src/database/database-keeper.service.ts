import { ENV } from "@constants/conf/env.constant";
import { isMasterServer } from "@core/__lib__/global.utils";
import { DATABASE_PROVIDERS } from "@database/database.provider";
import {
	accountCategoryExpensesStatsMaterializedView,
	accountMonthlyStatsMaterializedView,
	accountStatsMaterializedView,
} from "@database/schemas/main.schema";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class DatabaseKeeperService {
	private readonly logger = new Logger("DB Keeper");

	constructor(
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
	) {
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
		await this.updateFinancesMaterializedViews();

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

	@Cron(ENV.finances.databaseMaterializedViewsUpdateCron)
	async updateFinancesMaterializedViews() {
		if (!isMasterServer()) return;

		// Update account stats materialized view
		await this.databaseService.db.refreshMaterializedView(
			accountStatsMaterializedView,
		);
		// Update monthly stats
		await this.databaseService.db.refreshMaterializedView(
			accountMonthlyStatsMaterializedView,
		);

		// Update category expenses stats
		await this.databaseService.db.refreshMaterializedView(
			accountCategoryExpensesStatsMaterializedView,
		);
	}

	// #endregion
}
