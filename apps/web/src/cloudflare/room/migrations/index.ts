export default {
	journal: {
		entries: [
			{
				idx: 0,
				when: 1774828800000,
				tag: "0000_create_messages",
				breakpoints: true,
			},
		],
	},
	migrations: {
		m0000: `CREATE TABLE \`messages\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`room_id\` text NOT NULL,
	\`author\` text NOT NULL,
	\`content\` text NOT NULL,
	\`timestamp\` integer NOT NULL,
	\`msg_type\` text DEFAULT 'user' NOT NULL
);`,
	},
};
