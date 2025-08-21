import { Injectable } from "@nestjs/common";
import * as pkg from "@pkg";

@Injectable()
export class ServerInfoService {
	/**
	 * Returns server information including the expected client version.
	 * Uses the server package version as the reference for client compatibility.
	 */
	getServerInfo() {
		return {
			// As all monorepo stays always on the same version, we use server version as reference
			expectedClientVersion: pkg.version,
		};
	}
}
