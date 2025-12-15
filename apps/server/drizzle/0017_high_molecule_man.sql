ALTER TABLE "debt"."debts" ADD COLUMN "userId" integer NOT NULL;--> statement-breakpoint
CREATE INDEX "debts_userId_notifiedAt_index" ON "debt"."debts" USING btree ("userId","notifiedAt");