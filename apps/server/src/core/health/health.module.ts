import { HealthController } from "@core/health/health.controller";
import { HealthService } from "@core/health/health.service";
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

@Module({
	imports: [TerminusModule],
	providers: [HealthService],
	controllers: [HealthController],
})
export class HealthModule {}
