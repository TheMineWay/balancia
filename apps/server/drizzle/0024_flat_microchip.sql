ALTER TABLE "debt"."debt_origin_transactions" DROP CONSTRAINT "debt_origin_transactions_transactionId_transactions_id_fk";
--> statement-breakpoint
ALTER TABLE "debt"."debt_origin_transactions" ADD CONSTRAINT "debt_origin_transactions_transactionId_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "finances"."transactions"("id") ON DELETE set null ON UPDATE no action;