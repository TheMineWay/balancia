ALTER TABLE "debt"."debts" DROP CONSTRAINT "debts_debtorId_transactionId_unique";--> statement-breakpoint
ALTER TABLE "debt"."debts" DROP CONSTRAINT "debts_transactionId_transactions_id_fk";
--> statement-breakpoint
CREATE INDEX "debts_debtorId_index" ON "debt"."debts" USING btree ("debtorId");--> statement-breakpoint
ALTER TABLE "debt"."debts" DROP COLUMN "transactionId";