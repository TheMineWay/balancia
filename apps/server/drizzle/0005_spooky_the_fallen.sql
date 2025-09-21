ALTER TABLE "finances"."tag_automatchers" DROP CONSTRAINT "tag_automatchers_tagId_tags_id_fk";
--> statement-breakpoint
ALTER TABLE "finances"."tag_automatchers" DROP CONSTRAINT "tag_automatchers_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "finances"."tag_automatchers" ADD CONSTRAINT "tag_automatchers_tagId_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "finances"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances"."tag_automatchers" ADD CONSTRAINT "tag_automatchers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "identity"."users"("id") ON DELETE cascade ON UPDATE no action;