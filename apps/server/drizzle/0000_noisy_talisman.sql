CREATE TABLE `permission` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(64) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `permission_id` PRIMARY KEY(`id`),
	CONSTRAINT `permission_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `role_permission` (
	`roleId` int NOT NULL,
	`permissionId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `role_permission_roleId_permissionId_pk` PRIMARY KEY(`roleId`,`permissionId`)
);
--> statement-breakpoint
CREATE TABLE `role` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `role_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_role` (
	`userId` int NOT NULL,
	`roleId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_role_userId_roleId_pk` PRIMARY KEY(`userId`,`roleId`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(64) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
ALTER TABLE `role_permission` ADD CONSTRAINT `role_permission_roleId_role_id_fk` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `role_permission` ADD CONSTRAINT `role_permission_permissionId_permission_id_fk` FOREIGN KEY (`permissionId`) REFERENCES `permission`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_role` ADD CONSTRAINT `user_role_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_role` ADD CONSTRAINT `user_role_roleId_role_id_fk` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE cascade ON UPDATE no action;