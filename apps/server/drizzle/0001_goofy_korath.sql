CREATE SCHEMA "transactions";
--> statement-breakpoint
CREATE TYPE "public"."time_precision" AS ENUM('date', 'datetime');--> statement-breakpoint
CREATE TABLE "transactions"."categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(512),
	"userId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions"."transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"subject" varchar(255),
	"performedAt" timestamp NOT NULL,
	"performedAtPrecision" time_precision DEFAULT 'datetime' NOT NULL,
	"categoryId" integer,
	"userId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transactions"."categories" ADD CONSTRAINT "categories_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions"."transactions" ADD CONSTRAINT "transactions_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "transactions"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions"."transactions" ADD CONSTRAINT "transactions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "categories_userId_index" ON "transactions"."categories" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "user_id_and_performed_at_IDX" ON "transactions"."transactions" USING btree ("userId","performedAt" DESC);--> statement-breakpoint
CREATE INDEX "category_id_IDX" ON "transactions"."transactions" USING btree ("categoryId");