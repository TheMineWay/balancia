import { UI_COLORS } from "@constants/env/env.constant";
import type { ProviderSetter } from "@providers/provider-setter.type";
import { createContext, useContext } from "react";
import { z } from "zod";

export const LOCAL_CONFIG_SCHEMA = z.object({
	theme: z.object({
		colorScheme: z.enum(["light", "dark"]).optional().default("light"),
		primaryColor: z.enum(UI_COLORS).optional().default("grape"),
	}),
});

export type LocalConfig = z.infer<typeof LOCAL_CONFIG_SCHEMA>;

export const LocalConfigContext = createContext<ProviderSetter<LocalConfig>>(
	null!,
);

export const useLocalConfig = () => {
	const context = useContext(LocalConfigContext);

	if (!context)
		throw new Error("useLocalConfig must be used within a LocalConfigProvider");

	return { config: context.context, setConfig: context.setContext };
};
