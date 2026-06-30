import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { LinkNotFoundError } from "@/app/errors/link-not-found-error";
import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas";
import { makeLeft, makeRight } from "@/shared/either";

const incrementLinkAccessCountInput = z.object({
	shortenedUrl: z.string().regex(/^[a-zA-Z0-9_-]+$/),
});

type IncrementLinkAccessCountInput = z.input<
	typeof incrementLinkAccessCountInput
>;

export async function incrementLinkAccessCount(
	input: IncrementLinkAccessCountInput,
) {
	const { shortenedUrl } = incrementLinkAccessCountInput.parse(input);

	const [updatedLink] = await db
		.update(links)
		.set({
			accessCount: sql`${links.accessCount} + 1`,
			lastAccessedAt: new Date(),
		})
		.where(eq(links.shortenedUrl, shortenedUrl))
		.returning();

	if (!updatedLink) {
		return makeLeft(new LinkNotFoundError());
	}

	return makeRight(updatedLink);
}
