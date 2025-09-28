import clsx from "clsx";
import styles from "./chart-wrapper.module.css";

type Props = {
	children: React.ReactNode;
};

export const ChartWrapper: FC<Props> = ({ children }) => {
	return (
		<div className={clsx(styles.wrapper, "w-full h-full")}>{children}</div>
	);
};
