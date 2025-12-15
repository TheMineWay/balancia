import { ENV } from "@constants/conf/env.constant";
import { AuthModule } from "@core/auth/auth/auth.module";
import { JwtAuthGuard } from "@core/auth/auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "@core/auth/auth/guards/permission.guard";
import { CachesModule } from "@core/cache/caches.module";
import { CoreModule } from "@core/core.module";
import { DatabaseModule } from "@database/database.module";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { UserPreferencesModule } from "src/common/user/preferences/user-preferences.module";
import { EventModule } from "src/events/event.module";
import { DebtsModule } from "src/features/debts/debts.module";
import { FinancesModule } from "src/features/finances/finances.module";
import { SocialModule } from "src/features/social/social.module";
import { IntegrationModule } from "src/integrations/integration.module";

@Module({
	imports: [
		EventModule,
		DatabaseModule,
		CachesModule,
		ThrottlerModule.forRoot([
			{
				ttl: 60 * 1000,
				limit: ENV.rateLimit.maxRequestsPerMinute,
			},
		]),
		AuthModule.register({
			clientId: ENV.oidc.clientId,
			clientSecret: ENV.oidc.clientSecret,
			host: ENV.oidc.host,
			issuerUrl: ENV.oidc.issuerUrl,
		}),
		ScheduleModule.forRoot(),
		IntegrationModule,
		CoreModule,

		// Common
		UserPreferencesModule,

		// App specific
		FinancesModule,
		DebtsModule,
		SocialModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: PermissionsGuard,
		},
	],
})
export class AppModule {}
