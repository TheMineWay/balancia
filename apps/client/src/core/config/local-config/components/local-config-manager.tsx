import { PrimaryColorChanger } from "@core/config/local-config/components/theme/primary-color-changer";
import { useTranslation } from "@i18n/use-translation";
import { Divider } from "@mantine/core";
import { type ReactNode, useId, useMemo } from "react";

export const LocalConfigManager: FC = () => {
	return (
		<div className="flex flex-col gap-4">
			<Divider />
			<Theme />
		</div>
	);
};

/* Sections */

const Theme: FC = () => {
	const { t } = useTranslation("common");

	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-bold text-xl">
				{t()["local-config"].sections.theme.Title}
			</h3>
			<Item
				label="Primary Color"
				render={(id) => <PrimaryColorChanger id={id} />}
			/>
		</div>
	);
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
