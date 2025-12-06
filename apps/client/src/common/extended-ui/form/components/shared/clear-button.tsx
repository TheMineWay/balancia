import { ActionIcon } from "@mantine/core";
import { IoCloseOutline } from "react-icons/io5";

type Props = {
	onClear: () => void;
};

/**
 * A clear button component for form items.
 * Provides a convenient way to clear the value of a form field.
 */
export const FormItemClearButton: FC<Props> = ({ onClear }) => {
	return (
		<ActionIcon
			size="xs"
			onClick={(e) => {
				e.stopPropagation();
				onClear();
			}}
			variant="transparent"
		>
			<IoCloseOutline />
		</ActionIcon>
	);
};
