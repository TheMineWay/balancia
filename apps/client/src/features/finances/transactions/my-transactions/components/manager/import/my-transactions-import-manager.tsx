import { readFile } from "@common/file/lib/read-file.util";
import { useTranslation } from "@i18n/use-translation";
import { Flex, Stepper } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { TimePrecision, type TransactionCreateModel } from "@shared/models";
import Papa from "papaparse";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BsFiletypeCsv } from "react-icons/bs";
import z from "zod";

type ImportRow = Omit<TransactionCreateModel, "accountId">;

const CSV_ROW_SCHEMA = z.object({
	subject: z.string().transform((v) => v.trim()),
	amount: z
		.string()
		.transform((v) => v.trim())
		.transform((v) => v.replace(",", "."))
		.refine((v) => !Number.isNaN(Number(v)))
		.transform((v) => Number(v)),
	performedAt: z.string().transform((v) => new Date(v)),
	categoryId: z
		.string()
		.nullish()
		.transform((v) => (v ? parseInt(v.trim(), 10) : null)),
});

export const MyTransactionsImportManager: FC = () => {
	const { t } = useTranslation("finances");
	const [transactions, setTransactions] = useState<ImportRow[]>([]);

	const step = useMemo(() => {
		if (transactions.length > 0) return 1;

		return 0;
	}, [transactions]);

	return (
		<Flex direction="column" gap="md">
			<Stepper active={step}>
				<Stepper.Step
					label={t().transaction.managers.import.steps["select-file"].Title}
				/>
				<Stepper.Step
					label={
						t().transaction.managers.import.steps["review-transactions"].Title
					}
				/>
				<Stepper.Step
					label={t().transaction.managers.import.steps.import.Title}
				/>
			</Stepper>

			{step === 0 && <FileSelect setTransactions={setTransactions} />}
		</Flex>
	);
};

/* Steps */

/* 1. Import file */

type FileSelectProps = {
	setTransactions: (transactions: ImportRow[]) => void;
};

const FileSelect: FC<FileSelectProps> = ({ setTransactions }) => {
	const { t } = useTranslation("finances");
	const [file, setFile] = useState<File | null>(null);

	/**
	 * Apply transformations to a single row
	 */
	const parseRow = useCallback((row: z.infer<typeof CSV_ROW_SCHEMA>) => {
		return {
			subject: row.subject,
			amount: row.amount,
			performedAt: row.performedAt,
			categoryId: row.categoryId,
			performedAtPrecision: TimePrecision.DATETIME,
		} satisfies ImportRow;
	}, []);

	/**
	 * Convert the CSV content into an array of transactions
	 */
	const parseFile = useCallback(
		(content: string) => {
			const rows = Papa.parse(content, { header: true, skipEmptyLines: true });

			// Parse each row
			return rows.data.map((row) => {
				const parsed = CSV_ROW_SCHEMA.safeParse(row);
				console.log({ parsed, row });
				if (!parsed.data) return null;
				return parseRow(parsed.data);
			});
		},
		[parseRow],
	);

	useEffect(() => {
		if (!file) return;

		readFile(file).then((content) => {
			const parsed = parseFile(content);
			setTransactions(parsed.filter((t) => Boolean(t)) as ImportRow[]);
			setFile(null);
		});
	}, [file, setTransactions, parseFile]);

	return (
		<Flex direction="column" gap="md">
			<Dropzone
				onDrop={(file) => setFile(new File([file[0]], file[0].name))}
				accept={[MIME_TYPES.csv, "application/vnd.ms-excel"]}
				maxFiles={1}
				maxSize={3 * 1024 ** 2}
				loading={Boolean(file)}
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
						{
							t().transaction.managers.import.steps["select-file"].form.fields
								.file.Label
						}
					</small>
				</Flex>
			</Dropzone>
		</Flex>
	);
};
