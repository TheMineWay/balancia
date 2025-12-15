import { UI_COLORS } from "@constants/env/env.constant";
import { PageSizeGenerationStrategy } from "@core/pagination/lib/generate-page-sizes-from-limits.util";
import { MASTER_LOCALE } from "@i18n/locales/locales";
import { Language } from "@i18n/types/language.enum";
import type { ProviderSetter } from "@providers/provider-setter.type";
import { GLOBAL_CONFIGS } from "@shared/constants";
import { createContext, useContext } from "react";
import { z } from "zod";

export const LOCAL_CONFIG_SCHEMA = z.object({
	theme: z.object({
		colorScheme: z.enum(["light", "dark"]).optional().default("light"),
		primaryColor: z.enum(UI_COLORS).optional().default("grape"),
	}),
	language: z.enum(Language).default(MASTER_LOCALE),
	pagination: z.object({
		pageSize: z
			.number()
			.min(GLOBAL_CONFIGS.PAGINATION.MIN_PAGE_SIZE)
			.max(GLOBAL_CONFIGS.PAGINATION.MAX_PAGE_SIZE)
			.default(GLOBAL_CONFIGS.PAGINATION.DEFAULT_PAGE_SIZE),
		pageSizeSelectorStrategy: z
			.enum(PageSizeGenerationStrategy)
			.default(PageSizeGenerationStrategy.PROGRESSIVE),
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
