import { RenderCurrency } from "@common/extended-ui/currency/render-currency";
import { DateRender } from "@common/extended-ui/date/components/date-render";
import { Table } from "@common/extended-ui/table/components/table";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import type { TableColumn } from "@common/extended-ui/table/types/table-column.type";
import { readFile } from "@common/file/lib/read-file.util";
import { MyAccountsSelector } from "@fts/finances/accounts/my-accounts/components/form/my-accounts.selector";
import { useMyTransactionsBulkCreateByAccountMutation } from "@fts/finances/transactions/my-transactions/api/use-my-transactions-bulk-create-by-account.mutation";
import { useTranslation } from "@i18n/use-translation";
import { Button, Flex, Stepper, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import {
	type AccountModel,
	TimePrecision,
	type TransactionCreateModel,
} from "@shared/models";
import Papa from "papaparse";
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	useTransition,
} from "react";
import { BsFiletypeCsv } from "react-icons/bs";
import { CiImport } from "react-icons/ci";
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

type Props = {
	onSuccess?: CallableFunction;
};

export const MyTransactionsImportManager: FC<Props> = ({ onSuccess }) => {
	const { t } = useTranslation("finances");

	const [, startTransition] = useTransition();
	const [transactions, setTransactions] = useState<ImportRow[]>([]);
	const [reviewed, setReviewed] = useState(false);

	const step = useMemo(() => {
		if (transactions.length === 0) return 0;
		if (!reviewed) return 1;

		return 2;
	}, [transactions, reviewed]);

	const onImportComplete = useCallback(() => {
		startTransition(() => {
			setTransactions([]);
			setReviewed(false);
		});
		onSuccess?.();
	}, [onSuccess]);

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
					label={t().transaction.managers.import.steps["target"].Title}
				/>
			</Stepper>

			{step === 0 && <FileSelect setTransactions={setTransactions} />}
			{step === 1 && (
				<ReviewTransactions
					transactions={transactions}
					onComplete={() => setReviewed(true)}
				/>
			)}
			{step === 2 && (
				<AccountSelect
					transactions={transactions}
					onComplete={onImportComplete}
				/>
			)}
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
				onDrop={(file) => {
					const f = file[0];
					if (!f) return;

					setFile(new File([f], f.name));
				}}
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

/* 2. Review transactions */

type ReviewTransactionsProps = {
	transactions: ImportRow[];
	onComplete: CallableFunction;
};

const ReviewTransactions: FC<ReviewTransactionsProps> = ({
	transactions = [],
	onComplete,
}) => {
	const { t } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const columns = useMemo<TableColumn<ImportRow>[]>(
		() => [
			{
				label: t().transaction.models.transaction.subject.Label,
				accessorKey: "subject",
			},
			{
				label: t().transaction.models.transaction.amount.Label,
				accessorKey: "amount",
				render: (row) => <RenderCurrency amount={row.amount} />,
			},
			{
				label: t().transaction.models.transaction.performedAt.Label,
				accessorKey: "performedAt",
				render: (row) => <DateRender date={row.performedAt} />,
			},
		],
		[t],
	);

	const table = useTable<ImportRow>({
		data: transactions,
		columns,
	});

	return (
		<Flex direction="column" gap="md">
			<Table table={table} />
			<Button onClick={() => onComplete()}>{commonT().expressions.Next}</Button>
		</Flex>
	);
};

/* 3. Define target account */

type AccountSelectProps = {
	transactions: ImportRow[];
	onComplete: CallableFunction;
};

const AccountSelect: FC<AccountSelectProps> = ({
	transactions,
	onComplete,
}) => {
	const { t: commonT } = useTranslation("common");
	const { t } = useTranslation("finances");

	const [accountId, setAccountId] = useState<AccountModel["id"] | null>(null);

	const { mutate: createTransactions, isPending: isImporting } =
		useMyTransactionsBulkCreateByAccountMutation();

	const handleImport = useCallback(() => {
		if (!accountId) return;
		createTransactions(
			{ transactions, accountId },
			{
				onSuccess: () => onComplete(),
			},
		);
	}, [createTransactions, transactions, accountId, onComplete]);

	return (
		<Flex direction="column" gap="md">
			<MyAccountsSelector value={accountId} onChange={setAccountId} />
			<Text>{t().transaction.managers.import.steps.target.Message}</Text>
			<Button
				loading={isImporting}
				leftSection={<CiImport />}
				onClick={handleImport}
				disabled={!accountId}
			>
				{commonT().expressions.Import}
			</Button>
		</Flex>
	);
};
