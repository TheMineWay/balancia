import { Button, Flex, Group, Input, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { IoWarning } from "react-icons/io5";

type Texts = {
	title: string;
	description: string;
	confirm: string;
};

type WriteToDeleteOptions = {
	label: string;
	placeholder?: string;
	confirmValue: string | null;
};

type Props = {
	// Trigger
	open?: boolean;
	onClose?: CallableFunction;

	// Actions
	onConfirm?: CallableFunction;
	writeToDelete?: WriteToDeleteOptions;

	// Metadata
	texts: Texts;

	// Icons
	confirmIcon?: React.ReactNode;
};

export const DangerousActionConfirm: FC<Props> = ({
	open = false,
	onClose,
	onConfirm,
	writeToDelete,

	// Metadata
	texts: { title, description, confirm },

	// Icons
	confirmIcon,
}) => {
	const [writeToDeleteValue, setWriteToDeleteValue] = useState("");

	const canDelete =
		!writeToDelete || writeToDeleteValue !== writeToDelete.confirmValue;

	return (
		<Modal
			size="xl"
			title={
				<Group>
					<IoWarning />
					<Text>{title}</Text>
				</Group>
			}
			opened={open}
			onClose={() => onClose?.()}
			centered
		>
			<Flex direction="column" gap="1rem">
				<Text>{description}</Text>
				<Flex gap="1rem" direction="column">
					{writeToDelete && (
						<WriteToDelete
							writeToDelete={writeToDelete}
							value={writeToDeleteValue}
							onChange={setWriteToDeleteValue}
						/>
					)}
					<Button
						disabled={canDelete}
						color="red"
						leftSection={confirmIcon}
						onClick={() => onConfirm?.()}
					>
						{confirm}
					</Button>
				</Flex>
			</Flex>
		</Modal>
	);
};

type WriteToDeleteProps = {
	writeToDelete: WriteToDeleteOptions;
	value: string;
	onChange: (value: string) => void;
};

const WriteToDelete: FC<WriteToDeleteProps> = ({
	writeToDelete,
	value,
	onChange,
}) => {
	return (
		<Input.Wrapper label={writeToDelete.label} className="w-full">
			<Input
				placeholder={writeToDelete.placeholder}
				value={value}
				onChange={(e) => onChange(e.currentTarget.value)}
				disabled={writeToDelete.confirmValue === null}
			/>
		</Input.Wrapper>
	);
};
