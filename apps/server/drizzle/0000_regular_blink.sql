CREATE TABLE `totp-recovery-codes` (
	`userId` int NOT NULL,
	`code` varchar(12) NOT NULL,
	`createdAt` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `totp-recovery-codes_userId_code_unique` UNIQUE(`userId`,`code`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`lastName` varchar(64) NOT NULL,
	`username` varchar(32) NOT NULL,
	`password` varchar(512) NOT NULL,
	`totpSecret` varchar(128),
	`createdAt` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `totp-recovery-codes` ADD CONSTRAINT `totp-recovery-codes_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;