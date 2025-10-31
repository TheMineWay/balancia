import { useTranslation } from "@i18n/use-translation";
import clsx from "clsx";
import { PiEmpty } from "react-icons/pi";
import styles from "./chart-wrapper.module.css";

type Props = {
	children: React.ReactNode;
	empty?: boolean;
	title?: string;
};

export const ChartWrapper: FC<Props> = ({ children, empty = false, title }) => {
	return (
		<div className="flex flex-col gap-1 w-full h-full">
			{title && (
				<h3 className="text-lg font-medium leading-tight tracking-tight">
					{title}
				</h3>
			)}
			<div className="w-full h-full flex flex-col justify-center items-center">
				<Content empty={empty}>{children}</Content>
			</div>
		</div>
	);
};

const Content = ({
	children,
	empty,
}: {
	children: React.ReactNode;
	empty: boolean;
}) => {
	const { t } = useTranslation("common");

	if (empty) {
		return (
			<div className="flex flex-col gap-1 justify-center items-center text-muted">
				<PiEmpty size={32} />
				<small>{t().components.status["no-data"].Title}</small>
			</div>
		);
	}

	return (
		<div className={clsx(styles.wrapper, "w-full h-full")}>{children}</div>
	);
};
