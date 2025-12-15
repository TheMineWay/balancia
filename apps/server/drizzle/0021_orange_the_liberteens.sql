ALTER TABLE "debt"."debt_original_transactions" RENAME TO "debt_origin_transactions";--> statement-breakpoint
ALTER TABLE "debt"."debt_origin_transactions" DROP CONSTRAINT "debt_original_transactions_debtId_debts_id_fk";
--> statement-breakpoint
ALTER TABLE "debt"."debt_origin_transactions" DROP CONSTRAINT "debt_original_transactions_transactionId_transactions_id_fk";
--> statement-breakpoint
ALTER TABLE "debt"."debt_origin_transactions" ADD CONSTRAINT "debt_origin_transactions_debtId_debts_id_fk" FOREIGN KEY ("debtId") REFERENCES "debt"."debts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "debt"."debt_origin_transactions" ADD CONSTRAINT "debt_origin_transactions_transactionId_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "finances"."transactions"("id") ON DELETE cascade ON UPDATE no action;