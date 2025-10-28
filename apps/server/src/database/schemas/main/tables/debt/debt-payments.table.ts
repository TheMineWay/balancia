import { timestamps } from "@database/common/timestamps";
import { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { transactionsTable } from "@database/schemas/main.schema";
import { debtSchema } from "@database/schemas/main/tables/debt/debt.schema";
import { debtTable } from "@database/schemas/main/tables/debt/debt.table";
import { DebtPaymentModel } from "@shared/models";
import { index, integer, serial, unique } from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<DebtPaymentModel>;

export const debtPaymentTable = debtSchema.table(
	"debt_payments",
	{
		id: serial().primaryKey(),
		debtId: integer()
			.references(() => debtTable.id)
			.notNull(),
		transactionId: integer()
			.references(() => transactionsTable.id)
			.notNull(),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [unique().on(table.transactionId), index().on(table.debtId)],
);
