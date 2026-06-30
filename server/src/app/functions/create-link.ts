import { eq } from "drizzle-orm";
import { z } from "zod";
import { LinkAlreadyExistsError } from "@/app/errors/link-already-exists-error";
import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas";
import { makeLeft, makeRight } from "@/shared/either";

const createLinkInput = z.object({
	originalUrl: z.url(),
	shortenedUrl: z.string().regex(/^[a-zA-Z0-9_-]+$/),
});

type CreateLinkInput = z.input<typeof createLinkInput>;

export async function createLink(input: CreateLinkInput) {
	const { originalUrl, shortenedUrl } = createLinkInput.parse(input);

	const existingLink = await db.query.links.findFirst({
		where: eq(links.shortenedUrl, shortenedUrl),
	});

	if (existingLink) {
		return makeLeft(new LinkAlreadyExistsError());
	}

	const [createdLink] = await db
		.insert(links)
		.values({
			originalUrl,
			shortenedUrl,
		})
		.returning();

	return makeRight(createdLink);
}
