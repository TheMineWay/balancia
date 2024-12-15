CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`lastName` varchar(64) NOT NULL,
	`username` varchar(32) NOT NULL,
	`password` varchar(512) NOT NULL,
	`createdAt` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`)
);
