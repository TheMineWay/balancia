import { HealthController } from "@core/health/health.controller";
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

@Module({
	imports: [TerminusModule],
	controllers: [HealthController],
})
export class HealthModule {}
