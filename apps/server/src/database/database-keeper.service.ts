import { ENV } from "@constants/conf/env.constant";
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
	constructor(
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
	) {
		if (ENV.database.refreshMaterializedViewsOnStartup) {
			Logger.log("Refreshing all materialized views...", "DatabaseKeeper");
			this.refreshAll();
		}
	}

	refreshAll() {
		this.updateFinancesMaterializedViews();
	}

	@Cron(ENV.finances.databaseMaterializedViewsUpdateCron)
	async updateFinancesMaterializedViews() {
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
}
