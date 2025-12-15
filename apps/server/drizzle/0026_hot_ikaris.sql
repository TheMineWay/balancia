ALTER TABLE "debt"."debt_origin_transactions" ADD COLUMN "notes" varchar(512);--> statement-breakpoint
ALTER TABLE "debt"."debt_payments" ADD COLUMN "notes" varchar(512);