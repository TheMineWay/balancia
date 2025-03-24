CREATE TABLE `totp-enable` (
	`userId` int NOT NULL,
	`totpSecret` varchar(128) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `totp-enable_userId` PRIMARY KEY(`userId`)
);
--> statement-breakpoint
ALTER TABLE `totp-enable` ADD CONSTRAINT `totp-enable_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;