CREATE TABLE "finances"."tag_automatchers" (
	"tagId" integer NOT NULL,
	"criteria" json NOT NULL,
	"userId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "finances"."tag_automatchers" ADD CONSTRAINT "tag_automatchers_tagId_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "finances"."tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances"."tag_automatchers" ADD CONSTRAINT "tag_automatchers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "tag_automatchers_userId_tagId_index" ON "finances"."tag_automatchers" USING btree ("userId","tagId");