import { HealthService } from "@core/health/health.service";
import { Controller } from "@nestjs/common";
import {
	getController,
	HEALTH_CONTROLLER,
	type InferResponseDto,
} from "@shared/api-definition";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";

@Controller(getController(HEALTH_CONTROLLER, {}))
export class HealthController {
	constructor(private readonly healthService: HealthService) {}

	@Endpoint(HEALTH_CONTROLLER, "get")
	async getHealth(): Promise<
		InferResponseDto<typeof HEALTH_CONTROLLER, "get">
	> {
		return await this.healthService.getHealth();
	}
}
