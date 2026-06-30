import { db, pg } from "@/infra/db";
import { links } from "@/infra/db/schemas";

const linksSeed = [
	{
		originalUrl: "https://github.com/rocketseat-education/06-server-nodejs",
		shortenedUrl: "brevly-docs",
	},
	{
		originalUrl: "https://brev.ly",
		shortenedUrl: "brevly-app",
	},
	{
		originalUrl: "https://nodejs.org/en",
		shortenedUrl: "nodejs",
	},
];

export async function seedLinks() {
	await db
		.insert(links)
		.values(linksSeed)
		.onConflictDoNothing({ target: links.shortenedUrl });
}

async function main() {
	await seedLinks();
	await pg.end();
	console.log("Seed completed.");
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
	main().catch(async (error) => {
		console.error(error);
		await pg.end();
		process.exit(1);
	});
}
