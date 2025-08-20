import { ServerInfoController } from "@core/server/server-info.controller";
import { ServerInfoService } from "@core/server/server-info.service";
import { Module } from "@nestjs/common";

@Module({
	providers: [ServerInfoService],
	exports: [ServerInfoService],
	controllers: [ServerInfoController],
})
export class ServerInfoModule {}
