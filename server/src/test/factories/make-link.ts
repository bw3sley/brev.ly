import { randomUUID } from "node:crypto";
import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas";

type MakeLinkInput = {
	originalUrl?: string;
	shortenedUrl?: string;
	accessCount?: number;
	createdAt?: Date;
};

export async function makeLink(input: MakeLinkInput = {}) {
	const shortenedUrl = input.shortenedUrl ?? randomUUID();

	const [link] = await db
		.insert(links)
		.values({
			originalUrl: input.originalUrl ?? `https://example.com/${shortenedUrl}`,
			shortenedUrl,
			accessCount: input.accessCount ?? 0,
			createdAt: input.createdAt ?? new Date(),
		})
		.returning();

	return link;
}
