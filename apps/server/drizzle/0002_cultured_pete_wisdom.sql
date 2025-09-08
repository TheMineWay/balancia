CREATE SCHEMA "social";
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
ALTER TABLE "social"."contacts" ADD CONSTRAINT "contacts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;