import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Flex, Group, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { TransactionCreateModel } from "@shared/models";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BsFiletypeCsv } from "react-icons/bs";

export const MyTransactionsImportManager: FC = () => {
	const [transactions, setTransactions] = useState<TransactionCreateModel[]>(
		[],
	);

	return (
		<Flex direction="column" gap="md">
			<FileSelect onFileParsed={setTransactions} />
		</Flex>
	);
};

/* Parts */

type FileSelectProps = {
	onFileParsed: (transactions: TransactionCreateModel[]) => void;
};

const FileSelect: FC<FileSelectProps> = ({ onFileParsed }) => {
	const { t } = useTranslation("finances");
	const [file, setFile] = useState<File | null>(null);

	return (
		<Flex direction="column" gap="md">
			<Dropzone
				onDrop={(file) => setFile(new File([file[0]], file[0].name))}
				accept={[MIME_TYPES.csv, "application/vnd.ms-excel"]}
				maxFiles={1}
				maxSize={3 * 1024 ** 2}
			>
				<Flex
					justify="center"
					className="py-6"
					align="center"
					direction="column"
					gap="sm"
				>
					<BsFiletypeCsv size={40} />
					<small>
						{t().transaction.managers.import.form.fields.file.Label}
					</small>
				</Flex>
			</Dropzone>

			{file && (
				<Group justify="center">
					<ActionIcon
						onClick={() => setFile(null)}
						variant="outline"
						color="red"
					>
						<BiTrash />
					</ActionIcon>
					<Text>{file.name}</Text>
				</Group>
			)}
		</Flex>
	);
};
