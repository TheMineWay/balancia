import { Public } from "@core/auth/auth/guards/public.guard";
import { ServerInfoService } from "@core/server/server-info.service";
import { Controller } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import {
	getController,
	InferResponseDto,
	SERVER_INFO_CONTROLLER,
} from "@shared/api-definition";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";

@Controller(getController(SERVER_INFO_CONTROLLER, {}))
export class ServerInfoController {
	constructor(private readonly serverInfoService: ServerInfoService) {}

	@ApiOperation({ summary: "Get server information" })
	@Public()
	@Endpoint(SERVER_INFO_CONTROLLER, "get-server-info")
	getServerInfo(): InferResponseDto<
		typeof SERVER_INFO_CONTROLLER,
		"get-server-info"
	> {
		return this.serverInfoService.getServerInfo();
	}
}
