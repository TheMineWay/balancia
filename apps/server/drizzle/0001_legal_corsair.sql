CREATE SCHEMA "budget";
--> statement-breakpoint
CREATE TABLE "budget"."budget_segment_category" (
	"categoryId" integer NOT NULL,
	"segmentId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "budget_segment_category_categoryId_segmentId_pk" PRIMARY KEY("categoryId","segmentId")
);
--> statement-breakpoint
CREATE TABLE "budget"."budget_segment" (
	"id" serial PRIMARY KEY NOT NULL,
	"budgetId" integer NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(2048),
	"percent" smallint NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "budget_segment_percent_chk" CHECK ("budget"."budget_segment"."percent" >= 0 AND "budget"."budget_segment"."percent" <= 100)
);
--> statement-breakpoint
CREATE TABLE "budget"."budget" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"fromDate" date NOT NULL,
	"toDate" date NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(4096),
	"amount" numeric(10, 2) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "budget"."budget_segment_category" ADD CONSTRAINT "budget_segment_category_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "finances"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget"."budget_segment_category" ADD CONSTRAINT "budget_segment_category_segmentId_budget_segment_id_fk" FOREIGN KEY ("segmentId") REFERENCES "budget"."budget_segment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget"."budget_segment" ADD CONSTRAINT "budget_segment_budgetId_budget_id_fk" FOREIGN KEY ("budgetId") REFERENCES "budget"."budget"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget"."budget" ADD CONSTRAINT "budget_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "budget_segment_budgetId_index" ON "budget"."budget_segment" USING btree ("budgetId");--> statement-breakpoint
CREATE INDEX "budget_userId_index" ON "budget"."budget" USING btree ("userId");