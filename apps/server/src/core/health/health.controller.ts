import { ENV } from "@constants/conf/env.constant";
import { Public } from "@core/auth/auth/guards/public.guard";
import { HealthService } from "@core/health/health.service";
import { CacheInterceptor } from "@nestjs/cache-manager";
import {
	Controller,
	MethodNotAllowedException,
	Req,
	UnauthorizedException,
	UseInterceptors,
} from "@nestjs/common";
import {
	getController,
	HEALTH_CONTROLLER,
	type InferResponseDto,
} from "@shared/api-definition";
import type { Request } from "express";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";

@UseInterceptors(CacheInterceptor)
@Controller(getController(HEALTH_CONTROLLER, {}))
export class HealthController {
	constructor(private readonly healthService: HealthService) {}

	@Public()
	@Endpoint(HEALTH_CONTROLLER, "get")
	async getHealth(
		@Req() req: Request,
	): Promise<InferResponseDto<typeof HEALTH_CONTROLLER, "get">> {
		if (!ENV.health.enabled) throw new MethodNotAllowedException();

		/**
		 * Check API keys if configured
		 */
		if (
			ENV.health.apiKeys.length > 0 &&
			!isAuthorized({
				headers: req.headers,
				apiKeys: ENV.health.apiKeys,
			})
		) {
			throw new UnauthorizedException();
		}

		return await this.healthService.getHealth();
	}
}

/* Internal */
type IsAuthorizedOptions = {
	headers: Request["headers"];
	apiKeys: string[];
};

/**
 * Check if request is authorized based on API keys
 */
const isAuthorized = ({ headers, apiKeys }: IsAuthorizedOptions) => {
	if (typeof headers.authorization !== "string") return false;
	return apiKeys.includes(headers.authorization);
};
