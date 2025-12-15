CREATE TYPE "social"."contact_code_generation_strategy" AS ENUM('UUID', 'NAME-HASH');--> statement-breakpoint
CREATE TABLE "social"."user_social_configs" (
	"userId" integer PRIMARY KEY NOT NULL,
	"contactCodeGenerationStrategy" "social"."contact_code_generation_strategy" DEFAULT 'NAME-HASH' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "social"."user_social_configs" ADD CONSTRAINT "user_social_configs_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;