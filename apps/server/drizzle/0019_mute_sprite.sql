CREATE TABLE "debt"."debt_original_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"debtId" integer NOT NULL,
	"transactionId" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "debt"."debt_original_transactions" ADD CONSTRAINT "debt_original_transactions_debtId_debts_id_fk" FOREIGN KEY ("debtId") REFERENCES "debt"."debts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "debt"."debt_original_transactions" ADD CONSTRAINT "debt_original_transactions_transactionId_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "finances"."transactions"("id") ON DELETE cascade ON UPDATE no action;