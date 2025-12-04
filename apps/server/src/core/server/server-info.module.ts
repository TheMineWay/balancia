import { ServerInfoController } from "@core/server/server-info.controller";
import { ServerInfoService } from "@core/server/server-info.service";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";

@Module({
	imports: [CacheModule.register()],
	providers: [ServerInfoService],
	exports: [ServerInfoService],
	controllers: [ServerInfoController],
})
export class ServerInfoModule {}
