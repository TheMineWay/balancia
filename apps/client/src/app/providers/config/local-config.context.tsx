import { NivoColor } from "@common/extended-ui/chart/constants/nivo-color.enum";
import { UI_COLORS } from "@constants/env/env.constant";
import { MASTER_LOCALE } from "@i18n/locales/locales";
import { Language } from "@i18n/types/language.enum";
import type { ProviderSetter } from "@providers/provider-setter.type";
import { createContext, useContext } from "react";
import { z } from "zod";

export const LOCAL_CONFIG_SCHEMA = z.object({
	theme: z.object({
		colorScheme: z.enum(["light", "dark"]).optional().default("light"),
		primaryColor: z.enum(UI_COLORS).optional().default("grape"),
	}),
	language: z.enum(Language).default(MASTER_LOCALE),
	charts: z.object({
		theme: z.enum(NivoColor),
	}),
});

export type LocalConfig = z.infer<typeof LOCAL_CONFIG_SCHEMA>;

export const localConfigContext = createContext<ProviderSetter<LocalConfig>>(
	null!,
);

export const useLocalConfig = () => {
	const context = useContext(localConfigContext);

	if (!context)
		throw new Error("useLocalConfig must be used within a LocalConfigProvider");

	return { config: context.context, setConfig: context.setContext };
};
