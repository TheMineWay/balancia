import {
	ActionIcon,
	type ActionIconProps,
	CopyButton as MantineCopyButton,
	type CopyButtonProps as MantineCopyButtonProps,
	useMantineTheme,
} from "@mantine/core";
import { FaCheck } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";

export type CopyButtonProps = {
	actionIconProps?: Omit<ActionIconProps, "onClick" | "children">;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & Omit<MantineCopyButtonProps, "children">;

/**
 * A button that copies text to the clipboard and shows visual feedback.
 */
export const CopyButton: FC<CopyButtonProps> = ({
	actionIconProps = {},
	onClick,
	...props
}) => {
	const theme = useMantineTheme();

	return (
		<MantineCopyButton {...props}>
			{({ copied, copy }) => (
				<ActionIcon
					onClick={(e) => {
						copy();
						onClick?.(e);
					}}
					variant="outline"
					{...actionIconProps}
					color={copied ? theme.colors.green[6] : actionIconProps.color}
				>
					{copied ? <FaCheck /> : <IoCopyOutline />}
				</ActionIcon>
			)}
		</MantineCopyButton>
	);
};
