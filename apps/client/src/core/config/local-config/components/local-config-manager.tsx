import { ENV } from "@constants/env/env.constant";
import { LanguageChanger } from "@core/config/local-config/components/language/language-changer";
import { PrimaryColorChanger } from "@core/config/local-config/components/theme/primary-color-changer";
import { PageSizeSelector } from "@core/pagination/components/page-size-selector";
import { PageSizeGenerationStrategy } from "@core/pagination/lib/generate-page-sizes-from-limits.util";
import { useTranslation } from "@i18n/use-translation";
import { Button, Divider, InputWrapper, Select } from "@mantine/core";
import * as pkg from "@pkg";
import { useLocalConfig } from "@providers/config/local-config.context";
import { GLOBAL_CONFIGS } from "@shared/constants";
import clsx from "clsx";
import { useCallback, useMemo } from "react";

/**
 * Local configuration manager component.
 * Allows users to manage their device-specific configurations.
 */
export const LocalConfigManager: FC = () => {
	return (
		<div className="flex flex-col gap-4">
			<Divider />

			{/* Theming */}
			<Theme />
			<Divider />

			{/* Language */}
			<Language />
			<Divider />

			{/* Pagination */}
			<Pagination />
			<Divider />

			{/* Version indicator */}
			<div className="flex justify-center">
				<Version />
			</div>
		</div>
	);
};

/* Sections */

const Theme: FC = () => {
	const { t } = useTranslation("common");

	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-bold text-xl">
				{t().components["local-config"].sections.theme.Title}
			</h3>

			<InputWrapper
				label={t().components["local-config"].configs["primary-color"].Name}
			>
				<PrimaryColorChanger />
			</InputWrapper>
		</div>
	);
};

const Language: FC = () => {
	const { t } = useTranslation("common");

	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-bold text-xl">
				{t().components["local-config"].sections.language.Title}
			</h3>

			<InputWrapper
				label={t().components["local-config"].configs.language.Name}
			>
				<LanguageChanger />
			</InputWrapper>
		</div>
	);
};

const Pagination: FC = () => {
	const { t } = useTranslation("common");
	const { config, setConfig } = useLocalConfig();

	const pageSizeStrategyOptions = useMemo(() => {
		return Object.values(PageSizeGenerationStrategy).map((strategy) => ({
			value: strategy,
			label:
				t().components["local-config"].configs["page-size-selector-strategy"]
					.options[strategy],
		}));
	}, [t]);

	const onPageSizeStrategyChange = useCallback(
		(value: string | null) => {
			if (!value) return;

			setConfig({
				...config,
				pagination: {
					...config.pagination,
					pageSize: GLOBAL_CONFIGS.PAGINATION.DEFAULT_PAGE_SIZE,
					pageSizeSelectorStrategy: value as PageSizeGenerationStrategy,
				},
			});
		},
		[setConfig, config],
	);

	const onDefaultPageSizeChange = useCallback(
		(newSize: number) => {
			setConfig({
				...config,
				pagination: {
					...config.pagination,
					pageSize: newSize,
				},
			});
		},
		[setConfig, config],
	);

	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-bold text-xl">
				{t().components["local-config"].sections.pagination.Title}
			</h3>

			<InputWrapper
				label={
					t().components["local-config"].configs["page-size-selector-strategy"]
						.Name
				}
			>
				<Select
					data={pageSizeStrategyOptions}
					value={config.pagination?.pageSizeSelectorStrategy}
					onChange={onPageSizeStrategyChange}
				/>
			</InputWrapper>

			<InputWrapper
				label={t().components["local-config"].configs["default-page-size"].Name}
			>
				<PageSizeSelector
					value={config.pagination.pageSize}
					onChange={onDefaultPageSizeChange}
				/>
			</InputWrapper>
		</div>
	);
};

const Version: FC = () => {
	const className = "text-center";
	const text = `v${pkg.version}`;

	if (ENV.links.version)
		return (
			<a
				href={ENV.links.version}
				target="_blank"
				className={clsx(className, "inline-flex w-fit")}
			>
				<Button size="compact-sm" variant="subtle">
					{text}
				</Button>
			</a>
		);
	return <small className={className}>{text}</small>;
};
