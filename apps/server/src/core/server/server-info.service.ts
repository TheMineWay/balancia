import { Injectable } from "@nestjs/common";

@Injectable()
export class ServerInfoService {
	getServerInfo() {
		return {
			expectedClientVersion: "1.0.0",
		};
	}
}
