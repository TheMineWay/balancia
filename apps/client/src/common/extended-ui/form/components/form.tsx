import clsx from "clsx";
import type { CSSProperties, HTMLAttributes } from "react";
import styles from "./form.module.pcss";

const FORM_CLASS = "flex flex-col gap-4";

type FormProps = Omit<
	HTMLAttributes<HTMLFormElement>,
	"style" | "className"
> & {
	styles?: {
		form?: CSSProperties;
	};
	classNames?: {
		form?: string;
	};
};

/**
 * Styled form component with consistent vertical layout and spacing.
 * Provides customizable styling through props while maintaining base form functionality.
 */
export const Form: FC<FormProps> = ({
	styles: stylesProps,
	classNames,
	children,
	...props
}) => {
	return (
		<form
			style={stylesProps?.form}
			className={clsx(FORM_CLASS, styles.form, classNames?.form)}
			{...props}
		>
			{children}
		</form>
	);
};
