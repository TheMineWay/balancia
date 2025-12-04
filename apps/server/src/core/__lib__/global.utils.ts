import { ENV } from "@constants/conf/env.constant";

export const isMasterServer = (): boolean => {
	return ENV.server.role === "main";
};
