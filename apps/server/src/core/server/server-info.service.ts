import { Injectable } from "@nestjs/common";
import * as pkg from "@pkg";

@Injectable()
export class ServerInfoService {
	getServerInfo() {
		return {
			// As all monorepo stays always on the same version, we use server version as reference
			expectedClientVersion: pkg.version,
		};
	}
}
