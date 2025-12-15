import { ENV } from "@constants/conf/env.constant";
import { HealthController } from "@core/health/health.controller";
import { HealthService } from "@core/health/health.service";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

@Module({
	imports: [
		TerminusModule,
		CacheModule.register({
			ttl: ENV.health.cacheTtl * 1000, // Convert to ms
		}),
	],
	exports: [HealthService],
	providers: [HealthService],
	controllers: [HealthController],
})
export class HealthModule {}
