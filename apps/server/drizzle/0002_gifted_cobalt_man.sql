CREATE TABLE "budget"."budget_segment_auto_imputation_history" (
	"imputationId" integer PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "budget_segment_auto_imputation_history_imputationId_unique" UNIQUE("imputationId")
);
--> statement-breakpoint
CREATE TABLE "budget"."budget_segment_category_auto_imputation_history" (
	"historyImputationId" integer PRIMARY KEY NOT NULL,
	"categoryId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "budget"."budget_segment_imputation" (
	"id" serial PRIMARY KEY NOT NULL,
	"segmentId" integer NOT NULL,
	"transactionId" integer NOT NULL,
	"description" varchar(1024),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "budget_segment_imputation_segmentId_transactionId_unique" UNIQUE("segmentId","transactionId")
);
--> statement-breakpoint
ALTER TABLE "budget"."budget_segment_auto_imputation_history" ADD CONSTRAINT "budget_segment_auto_imputation_history_imputationId_budget_segment_imputation_id_fk" FOREIGN KEY ("imputationId") REFERENCES "budget"."budget_segment_imputation"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget"."budget_segment_category_auto_imputation_history" ADD CONSTRAINT "budget_segment_category_auto_imputation_history_historyImputationId_budget_segment_auto_imputation_history_imputationId_fk" FOREIGN KEY ("historyImputationId") REFERENCES "budget"."budget_segment_auto_imputation_history"("imputationId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget"."budget_segment_category_auto_imputation_history" ADD CONSTRAINT "budget_segment_category_auto_imputation_history_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "finances"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget"."budget_segment_imputation" ADD CONSTRAINT "budget_segment_imputation_segmentId_budget_segment_id_fk" FOREIGN KEY ("segmentId") REFERENCES "budget"."budget_segment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget"."budget_segment_imputation" ADD CONSTRAINT "budget_segment_imputation_transactionId_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "finances"."transactions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "budget_segment_category_auto_imputation_history_categoryId_index" ON "budget"."budget_segment_category_auto_imputation_history" USING btree ("categoryId");