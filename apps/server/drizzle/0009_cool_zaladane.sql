ALTER TABLE "finances"."tag_automatchers" DROP CONSTRAINT "tag_automatchers_userId_users_id_fk";
--> statement-breakpoint
DROP INDEX "finances"."tag_automatchers_userId_tagId_index";--> statement-breakpoint
CREATE INDEX "tag_automatchers_tagId_index" ON "finances"."tag_automatchers" USING btree ("tagId");--> statement-breakpoint
ALTER TABLE "finances"."tag_automatchers" DROP COLUMN "userId";