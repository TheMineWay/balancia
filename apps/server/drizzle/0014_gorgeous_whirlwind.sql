CREATE SCHEMA "debt";
--> statement-breakpoint
CREATE TABLE "debt"."debt_payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"debtId" integer NOT NULL,
	"transactionId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "debt_payments_transactionId_unique" UNIQUE("transactionId")
);
--> statement-breakpoint
CREATE TABLE "debt"."debts" (
	"id" serial PRIMARY KEY NOT NULL,
	"transactionId" integer NOT NULL,
	"debtorId" integer NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"reason" varchar(2048),
	"notifiedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "debts_debtorId_transactionId_unique" UNIQUE("debtorId","transactionId")
);
--> statement-breakpoint
ALTER TABLE "debt"."debt_payments" ADD CONSTRAINT "debt_payments_debtId_debts_id_fk" FOREIGN KEY ("debtId") REFERENCES "debt"."debts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "debt"."debt_payments" ADD CONSTRAINT "debt_payments_transactionId_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "finances"."transactions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "debt"."debts" ADD CONSTRAINT "debts_transactionId_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "finances"."transactions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "debt"."debts" ADD CONSTRAINT "debts_debtorId_contacts_id_fk" FOREIGN KEY ("debtorId") REFERENCES "social"."contacts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "debt_payments_debtId_index" ON "debt"."debt_payments" USING btree ("debtId");