ALTER TABLE "debt"."debt_payments" DROP CONSTRAINT "debt_payments_debtId_debts_id_fk";
--> statement-breakpoint
ALTER TABLE "debt"."debt_payments" DROP CONSTRAINT "debt_payments_transactionId_transactions_id_fk";
--> statement-breakpoint
ALTER TABLE "debt"."debt_payments" ALTER COLUMN "transactionId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "debt"."debt_payments" ADD COLUMN "debtorId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "debt"."debt_payments" ADD COLUMN "amount" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "debt"."debt_payments" ADD COLUMN "paidAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "debt"."debt_payments" ADD CONSTRAINT "debt_payments_debtorId_contacts_id_fk" FOREIGN KEY ("debtorId") REFERENCES "social"."contacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "debt"."debt_payments" ADD CONSTRAINT "debt_payments_debtId_debts_id_fk" FOREIGN KEY ("debtId") REFERENCES "debt"."debts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "debt"."debt_payments" ADD CONSTRAINT "debt_payments_transactionId_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "finances"."transactions"("id") ON DELETE cascade ON UPDATE no action;