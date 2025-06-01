ALTER TABLE `user` DROP INDEX `user_email_unique`;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `email` varchar(256);--> statement-breakpoint
ALTER TABLE `user` ADD `code` varchar(32) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_code_unique` UNIQUE(`code`);--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `password`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `totpSecret`;