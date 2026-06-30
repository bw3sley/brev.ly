import { count, ilike } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas";
import { makeRight } from "@/shared/either";

const getLinksInput = z.object({
	page: z.coerce.number().optional().default(1),
	pageSize: z.coerce.number().optional().default(20),
	search: z.string().optional(),
});

type GetLinksInput = z.input<typeof getLinksInput>;

export async function getLinks(input: GetLinksInput) {
	const { page, pageSize, search } = getLinksInput.parse(input);

	const where = search ? ilike(links.shortenedUrl, `%${search}%`) : undefined;

	const [totalResult, foundLinks] = await Promise.all([
		db.select({ count: count() }).from(links).where(where),
		db.query.links.findMany({
			where,
			orderBy: (fields, { desc }) => [desc(fields.createdAt)],
			limit: pageSize,
			offset: (page - 1) * pageSize,
		}),
	]);

	return makeRight({
		total: totalResult[0]?.count ?? 0,
		links: foundLinks,
	});
}
