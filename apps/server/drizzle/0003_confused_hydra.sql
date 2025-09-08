ALTER TABLE "finances"."transaction_tags" DROP CONSTRAINT "transaction_tags_transactionId_transactions_id_fk";
--> statement-breakpoint
ALTER TABLE "finances"."transaction_tags" DROP CONSTRAINT "transaction_tags_tagId_tags_id_fk";
--> statement-breakpoint
ALTER TABLE "finances"."transaction_tags" ADD CONSTRAINT "transaction_tags_transactionId_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "finances"."transactions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances"."transaction_tags" ADD CONSTRAINT "transaction_tags_tagId_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "finances"."tags"("id") ON DELETE cascade ON UPDATE no action;