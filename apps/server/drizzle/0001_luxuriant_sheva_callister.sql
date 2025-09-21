CREATE TABLE "finances"."tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(256),
	"userId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finances"."transaction_tags" (
	"transactionId" integer NOT NULL,
	"tagId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "transaction_tags_transactionId_tagId_pk" PRIMARY KEY("transactionId","tagId")
);
--> statement-breakpoint
ALTER TABLE "finances"."tags" ADD CONSTRAINT "tags_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances"."transaction_tags" ADD CONSTRAINT "transaction_tags_transactionId_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "finances"."transactions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances"."transaction_tags" ADD CONSTRAINT "transaction_tags_tagId_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "finances"."tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "tags_userId_index" ON "finances"."tags" USING btree ("userId");