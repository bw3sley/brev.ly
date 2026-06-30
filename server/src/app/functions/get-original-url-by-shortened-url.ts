import { eq } from "drizzle-orm";
import { z } from "zod";
import { LinkNotFoundError } from "@/app/errors/link-not-found-error";
import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas";
import { makeLeft, makeRight } from "@/shared/either";

const getOriginalUrlByShortenedUrlInput = z.object({
	shortenedUrl: z.string().regex(/^[a-zA-Z0-9_-]+$/),
});

type GetOriginalUrlByShortenedUrlInput = z.input<
	typeof getOriginalUrlByShortenedUrlInput
>;

export async function getOriginalUrlByShortenedUrl(
	input: GetOriginalUrlByShortenedUrlInput,
) {
	const { shortenedUrl } = getOriginalUrlByShortenedUrlInput.parse(input);

	const foundLink = await db.query.links.findFirst({
		where: eq(links.shortenedUrl, shortenedUrl),
	});

	if (!foundLink) {
		return makeLeft(new LinkNotFoundError());
	}

	return makeRight({ originalUrl: foundLink.originalUrl });
}
