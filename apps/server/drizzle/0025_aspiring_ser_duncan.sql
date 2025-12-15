ALTER TABLE "debt"."debt_payments" DROP CONSTRAINT "debt_payments_debtorId_contacts_id_fk";
--> statement-breakpoint
ALTER TABLE "debt"."debt_payments" DROP COLUMN "debtorId";