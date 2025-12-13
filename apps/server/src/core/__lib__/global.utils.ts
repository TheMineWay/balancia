import { ENV } from "@constants/conf/env.constant";

/**
 * Check if the current server is the master/main server
 */
export const isMasterServer = (): boolean => {
	return ENV.server.role === "main";
};
