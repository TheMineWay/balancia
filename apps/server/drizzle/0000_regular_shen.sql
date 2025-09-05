CREATE SCHEMA "finances";
--> statement-breakpoint
CREATE SCHEMA "identity";
--> statement-breakpoint
CREATE TYPE "public"."time_precision" AS ENUM('date', 'datetime');--> statement-breakpoint
CREATE TABLE "finances"."accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(512),
	"userId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finances"."categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(512),
	"userId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "identity"."permissions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "identity"."permissions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"code" varchar(64) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "permissions_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "identity"."role_permissions" (
	"roleId" integer NOT NULL,
	"permissionId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "role_permissions_roleId_permissionId_pk" PRIMARY KEY("roleId","permissionId")
);
--> statement-breakpoint
CREATE TABLE "identity"."roles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "identity"."roles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(64) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finances"."transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"subject" varchar(255),
	"performedAt" timestamp NOT NULL,
	"performedAtPrecision" time_precision DEFAULT 'datetime' NOT NULL,
	"categoryId" integer,
	"accountId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "identity"."user_preferences" (
	"userId" integer PRIMARY KEY NOT NULL,
	"mainAccount" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "identity"."user_roles" (
	"userId" integer NOT NULL,
	"roleId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_roles_userId_roleId_pk" PRIMARY KEY("userId","roleId")
);
--> statement-breakpoint
CREATE TABLE "identity"."users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "identity"."users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"code" varchar(64) NOT NULL,
	"name" varchar(256) NOT NULL,
	"username" varchar(128) NOT NULL,
	"email" varchar(256),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "finances"."accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances"."categories" ADD CONSTRAINT "categories_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity"."role_permissions" ADD CONSTRAINT "role_permissions_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "identity"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity"."role_permissions" ADD CONSTRAINT "role_permissions_permissionId_permissions_id_fk" FOREIGN KEY ("permissionId") REFERENCES "identity"."permissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances"."transactions" ADD CONSTRAINT "transactions_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "finances"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances"."transactions" ADD CONSTRAINT "transactions_accountId_accounts_id_fk" FOREIGN KEY ("accountId") REFERENCES "finances"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity"."user_preferences" ADD CONSTRAINT "user_preferences_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity"."user_preferences" ADD CONSTRAINT "user_preferences_mainAccount_accounts_id_fk" FOREIGN KEY ("mainAccount") REFERENCES "finances"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity"."user_roles" ADD CONSTRAINT "user_roles_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity"."user_roles" ADD CONSTRAINT "user_roles_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "identity"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "categories_userId_index" ON "finances"."categories" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "role_permissions_roleId_idx" ON "identity"."role_permissions" USING btree ("roleId");--> statement-breakpoint
CREATE INDEX "role_permissions_permissionId_idx" ON "identity"."role_permissions" USING btree ("permissionId");--> statement-breakpoint
CREATE INDEX "account_id_and_performed_at_and_id_IDX" ON "finances"."transactions" USING btree ("accountId","performedAt" DESC,"id" DESC);--> statement-breakpoint
CREATE INDEX "category_id_IDX" ON "finances"."transactions" USING btree ("categoryId");--> statement-breakpoint
CREATE MATERIALIZED VIEW "finances"."account_monthly_stats" WITH (autovacuum_enabled = true) AS (select "finances"."accounts"."id", "finances"."accounts"."userId", EXTRACT(YEAR FROM "finances"."transactions"."performedAt")::integer as "year", EXTRACT(MONTH FROM "finances"."transactions"."performedAt")::integer as "month", sum("finances"."transactions"."amount")::numeric as "monthlyBalance", SUM(CASE WHEN "finances"."transactions"."amount" > 0 THEN "finances"."transactions"."amount" ELSE 0 END)::numeric as "income", SUM(CASE WHEN "finances"."transactions"."amount" < 0 THEN abs("finances"."transactions"."amount") ELSE 0 END)::numeric as "outcome" from "finances"."accounts" inner join "finances"."transactions" on "finances"."transactions"."accountId" = "finances"."accounts"."id" group by "finances"."accounts"."id", "year", "month");--> statement-breakpoint
CREATE MATERIALIZED VIEW "finances"."account_stats" WITH (autovacuum_enabled = true) AS (select "finances"."accounts"."userId", "finances"."accounts"."id", "balance" from "finances"."accounts" inner join (select sum("amount") as "balance", "accountId" from "finances"."transactions" group by "finances"."transactions"."accountId") "agg_balance" on "agg_balance"."accountId" = "finances"."accounts"."id");