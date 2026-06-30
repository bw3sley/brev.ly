import { beforeEach, describe, expect, it, vi } from "vitest";
import { exportLinksToCsv } from "@/app/functions/export-links-to-csv";
import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas";
import * as storage from "@/infra/storage/upload-file-to-storage";
import { isRight, unwrapEither } from "@/shared/either";
import { makeLink } from "@/test/factories/make-link";

describe("Export links to CSV", () => {
	beforeEach(async () => {
		vi.restoreAllMocks();
		await db.delete(links);
	});

	it("should be able to export links to csv and upload file", async () => {
		await makeLink({
			shortenedUrl: "rocketseat",
			originalUrl: "https://rocketseat.com.br",
			accessCount: 3,
			createdAt: new Date("2026-06-01T00:00:00.000Z"),
		});

		const uploadFileToStorageSpy = vi
			.spyOn(storage, "uploadFileToStorage")
			.mockResolvedValue({
				key: "downloads/file.csv",
				url: "https://cdn.example.com/downloads/file.csv",
			});

		const result = await exportLinksToCsv();

		expect(isRight(result)).toBe(true);
		expect(unwrapEither(result)).toEqual({
			url: "https://cdn.example.com/downloads/file.csv",
		});
		expect(uploadFileToStorageSpy).toHaveBeenCalledTimes(1);
		expect(uploadFileToStorageSpy.mock.calls[0]?.[0]).toEqual(
			expect.objectContaining({
				folder: "downloads",
				fileName: expect.stringMatching(/^links-.*\.csv$/),
				contentType: "text/csv",
			}),
		);
	});
});
