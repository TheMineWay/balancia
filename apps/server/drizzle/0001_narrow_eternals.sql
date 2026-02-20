CREATE TABLE "budget"."budget_segment_category_auto_matcher" (
	"categoryId" integer NOT NULL,
	"segmentId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "budget_segment_category_auto_matcher_categoryId_segmentId_pk" PRIMARY KEY("categoryId","segmentId")
);
--> statement-breakpoint
DROP TABLE "budget"."budget_segment_category" CASCADE;--> statement-breakpoint
ALTER TABLE "budget"."budget_segment_category_auto_matcher" ADD CONSTRAINT "budget_segment_category_auto_matcher_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "finances"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget"."budget_segment_category_auto_matcher" ADD CONSTRAINT "budget_segment_category_auto_matcher_segmentId_budget_segment_id_fk" FOREIGN KEY ("segmentId") REFERENCES "budget"."budget_segment"("id") ON DELETE no action ON UPDATE no action;