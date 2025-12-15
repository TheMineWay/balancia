CREATE TYPE "debt"."debt_status" AS ENUM('pending', 'paid', 'wont-pay', 'pardoned');--> statement-breakpoint
ALTER TABLE "debt"."debts" ADD COLUMN "status" "debt"."debt_status" DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "social"."user_social_configs" DROP COLUMN "contactCodeGenerationStrategy";--> statement-breakpoint
DROP TYPE "social"."contact_code_generation_strategy";