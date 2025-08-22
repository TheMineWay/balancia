import { ENV } from "@constants/env/env.constant";
import { LanguageChanger } from "@core/config/local-config/components/language/language-changer";
import { PrimaryColorChanger } from "@core/config/local-config/components/theme/primary-color-changer";
import { useTranslation } from "@i18n/use-translation";
import { Button, Divider } from "@mantine/core";
import * as pkg from "@pkg";
import clsx from "clsx";
import { type ReactNode, useId, useMemo } from "react";

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
			<Item
				label={t().components["local-config"].configs["primary-color"].Name}
				render={(id) => <PrimaryColorChanger id={id} />}
			/>
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
			<Item
				label={t().components["local-config"].configs.language.Name}
				render={(id) => <LanguageChanger id={id} />}
			/>
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

/* Utils */

type ItemProps = {
	label: string;
	render: (id: string) => ReactNode;
};

const Item: FC<ItemProps> = ({ label, render }) => {
	const id = useId();
	const component = useMemo(() => render(id), [id, render]);

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={id}>{label}</label>
			{component}
		</div>
	);
};
