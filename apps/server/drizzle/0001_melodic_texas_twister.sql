ALTER TABLE `user` ADD `email` varchar(128);--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_email_unique` UNIQUE(`email`);