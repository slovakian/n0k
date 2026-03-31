CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`room_id` text NOT NULL,
	`author` text NOT NULL,
	`content` text NOT NULL,
	`timestamp` integer NOT NULL,
	`msg_type` text DEFAULT 'user' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `room_new` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`room_number` integer NOT NULL,
	`page_size` integer DEFAULT 30 NOT NULL
);
--> statement-breakpoint
INSERT INTO `room_new` (`id`, `name`, `room_number`, `page_size`)
	SELECT `id`, `id`, 1, `page_size` FROM `room`;
--> statement-breakpoint
DROP TABLE `room`;
--> statement-breakpoint
ALTER TABLE `room_new` RENAME TO `room`;
--> statement-breakpoint
CREATE UNIQUE INDEX `room_name_number_uniq` ON `room` (`name`,`room_number`);
