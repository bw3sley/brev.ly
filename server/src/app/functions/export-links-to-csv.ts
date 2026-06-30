import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";
import { stringify } from "csv-stringify/sync";
import { db } from "@/infra/db";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { makeRight } from "@/shared/either";

export async function exportLinksToCsv() {
	const foundLinks = await db.query.links.findMany({
		orderBy: (fields, { desc }) => [desc(fields.createdAt)],
	});

	const csv = stringify(
		foundLinks.map((link) => ({
			original_url: link.originalUrl,
			shortened_url: link.shortenedUrl,
			access_count: link.accessCount,
			created_at: link.createdAt.toISOString(),
		})),
		{ header: true },
	);

	const uploadedFile = await uploadFileToStorage({
		folder: "downloads",
		fileName: `links-${randomUUID()}.csv`,
		contentType: "text/csv",
		contentStream: Readable.from(csv),
	});

	return makeRight({ url: uploadedFile.url });
}
