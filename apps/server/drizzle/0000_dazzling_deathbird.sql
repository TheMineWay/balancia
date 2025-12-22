CREATE SCHEMA "debt";
--> statement-breakpoint
CREATE SCHEMA "finances";
--> statement-breakpoint
CREATE SCHEMA "identity";
--> statement-breakpoint
CREATE SCHEMA "social";
--> statement-breakpoint
CREATE TYPE "debt"."debt_status" AS ENUM('pending', 'paid', 'wont-pay', 'pardoned');--> statement-breakpoint
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
CREATE TABLE "social"."contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(36) DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(64) NOT NULL,
	"lastName" varchar(128),
	"email" varchar(256),
	"phone" varchar(16),
	"userId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "contacts_userId_code_unique" UNIQUE("userId","code")
);
--> statement-breakpoint
CREATE TABLE "debt"."debt_origin_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"debtId" integer NOT NULL,
	"transactionId" integer,
	"amount" numeric(10, 2) NOT NULL,
	"notes" varchar(512),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "debt"."debt_payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"debtId" integer NOT NULL,
	"transactionId" integer,
	"amount" numeric(10, 2) NOT NULL,
	"paidAt" timestamp DEFAULT now() NOT NULL,
	"notes" varchar(512),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "debt_payments_transactionId_unique" UNIQUE("transactionId")
);
--> statement-breakpoint
CREATE TABLE "debt"."debts" (
	"id" serial PRIMARY KEY NOT NULL,
	"debtorId" integer NOT NULL,
	"userId" integer NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"reason" varchar(2048),
	"notifiedAt" timestamp,
	"status" "debt"."debt_status" DEFAULT 'pending' NOT NULL,
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
CREATE TABLE "finances"."tag_automatchers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"description" varchar(1024),
	"tagId" integer NOT NULL,
	"criteria" json NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
CREATE TABLE "social"."user_social_configs" (
	"userId" integer PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
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
ALTER TABLE "social"."contacts" ADD CONSTRAINT "contacts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "debt"."debt_origin_transactions" ADD CONSTRAINT "debt_origin_transactions_debtId_debts_id_fk" FOREIGN KEY ("debtId") REFERENCES "debt"."debts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "debt"."debt_origin_transactions" ADD CONSTRAINT "debt_origin_transactions_transactionId_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "finances"."transactions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "debt"."debt_payments" ADD CONSTRAINT "debt_payments_debtId_debts_id_fk" FOREIGN KEY ("debtId") REFERENCES "debt"."debts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "debt"."debt_payments" ADD CONSTRAINT "debt_payments_transactionId_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "finances"."transactions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "debt"."debts" ADD CONSTRAINT "debts_debtorId_contacts_id_fk" FOREIGN KEY ("debtorId") REFERENCES "social"."contacts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity"."role_permissions" ADD CONSTRAINT "role_permissions_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "identity"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity"."role_permissions" ADD CONSTRAINT "role_permissions_permissionId_permissions_id_fk" FOREIGN KEY ("permissionId") REFERENCES "identity"."permissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances"."tag_automatchers" ADD CONSTRAINT "tag_automatchers_tagId_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "finances"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances"."tags" ADD CONSTRAINT "tags_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances"."transaction_tags" ADD CONSTRAINT "transaction_tags_transactionId_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "finances"."transactions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances"."transaction_tags" ADD CONSTRAINT "transaction_tags_tagId_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "finances"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances"."transactions" ADD CONSTRAINT "transactions_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "finances"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances"."transactions" ADD CONSTRAINT "transactions_accountId_accounts_id_fk" FOREIGN KEY ("accountId") REFERENCES "finances"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity"."user_preferences" ADD CONSTRAINT "user_preferences_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity"."user_preferences" ADD CONSTRAINT "user_preferences_mainAccount_accounts_id_fk" FOREIGN KEY ("mainAccount") REFERENCES "finances"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity"."user_roles" ADD CONSTRAINT "user_roles_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity"."user_roles" ADD CONSTRAINT "user_roles_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "identity"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social"."user_social_configs" ADD CONSTRAINT "user_social_configs_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "categories_userId_index" ON "finances"."categories" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "debt_payments_debtId_index" ON "debt"."debt_payments" USING btree ("debtId");--> statement-breakpoint
CREATE INDEX "debts_debtorId_index" ON "debt"."debts" USING btree ("debtorId");--> statement-breakpoint
CREATE INDEX "debts_userId_notifiedAt_index" ON "debt"."debts" USING btree ("userId","notifiedAt");--> statement-breakpoint
CREATE INDEX "debts_status_index" ON "debt"."debts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "role_permissions_roleId_idx" ON "identity"."role_permissions" USING btree ("roleId");--> statement-breakpoint
CREATE INDEX "role_permissions_permissionId_idx" ON "identity"."role_permissions" USING btree ("permissionId");--> statement-breakpoint
CREATE INDEX "tag_automatchers_tagId_index" ON "finances"."tag_automatchers" USING btree ("tagId");--> statement-breakpoint
CREATE INDEX "tags_userId_index" ON "finances"."tags" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "account_id_and_performed_at_and_id_IDX" ON "finances"."transactions" USING btree ("accountId","performedAt" DESC,"id" DESC);--> statement-breakpoint
CREATE INDEX "category_id_IDX" ON "finances"."transactions" USING btree ("categoryId");--> statement-breakpoint
CREATE MATERIALIZED VIEW "finances"."account_category_expenses_stats" WITH (autovacuum_enabled = true) AS (select "accountId", "categoryId", date_trunc('month', "performedAt")::date as "date", SUM(CASE WHEN "amount" > 0 THEN "amount" ELSE 0 END)::numeric as "income", SUM(CASE WHEN "amount" < 0 THEN abs("amount") ELSE 0 END)::numeric as "outcome" from "finances"."transactions" group by "finances"."transactions"."accountId", "finances"."transactions"."categoryId", "date");--> statement-breakpoint
CREATE UNIQUE INDEX account_category_expenses_stats_accountId_categoryId_date_idx ON finances.account_category_expenses_stats ("accountId","categoryId","date");--> statement-breakpoint
CREATE MATERIALIZED VIEW "finances"."account_monthly_stats" WITH (autovacuum_enabled = true) AS (select "finances"."accounts"."id" as "accountId", "finances"."accounts"."userId", date_trunc('month', "finances"."transactions"."performedAt")::date as "date", sum("finances"."transactions"."amount")::numeric as "monthlyBalance", SUM(CASE WHEN "finances"."transactions"."amount" > 0 THEN "finances"."transactions"."amount" ELSE 0 END)::numeric as "income", SUM(CASE WHEN "finances"."transactions"."amount" < 0 THEN abs("finances"."transactions"."amount") ELSE 0 END)::numeric as "outcome" from "finances"."accounts" left join "finances"."transactions" on "finances"."transactions"."accountId" = "finances"."accounts"."id" group by "finances"."accounts"."id", "finances"."accounts"."userId", "date");--> statement-breakpoint
CREATE UNIQUE INDEX account_monthly_stats_accountId_date_idx ON finances.account_monthly_stats ("accountId","date");--> statement-breakpoint
CREATE MATERIALIZED VIEW "finances"."account_stats" WITH (autovacuum_enabled = true) AS (select "finances"."accounts"."userId", "finances"."accounts"."id" as "accountId", "balance" from "finances"."accounts" inner join (select sum("amount") as "balance", "accountId" from "finances"."transactions" group by "finances"."transactions"."accountId") "agg_balance" on "agg_balance"."accountId" = "finances"."accounts"."id");
CREATE UNIQUE INDEX account_stats_accountId_idx ON "finances"."account_stats" ("accountId");
