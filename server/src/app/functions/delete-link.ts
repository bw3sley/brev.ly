import { eq } from "drizzle-orm";
import { z } from "zod";
import { LinkNotFoundError } from "@/app/errors/link-not-found-error";
import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas";
import { makeLeft, makeRight } from "@/shared/either";

const deleteLinkInput = z.object({
	shortenedUrl: z.string().regex(/^[a-zA-Z0-9_-]+$/),
});

type DeleteLinkInput = z.input<typeof deleteLinkInput>;

export async function deleteLink(input: DeleteLinkInput) {
	const { shortenedUrl } = deleteLinkInput.parse(input);

	const [deletedLink] = await db
		.delete(links)
		.where(eq(links.shortenedUrl, shortenedUrl))
		.returning();

	if (!deletedLink) {
		return makeLeft(new LinkNotFoundError());
	}

	return makeRight({ shortenedUrl: deletedLink.shortenedUrl });
}
