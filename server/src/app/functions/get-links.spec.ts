import { beforeEach, describe, expect, it } from "vitest";
import { getLinks } from "@/app/functions/get-links";
import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas";
import { isRight, unwrapEither } from "@/shared/either";
import { makeLink } from "@/test/factories/make-link";

describe("Get links", () => {
	beforeEach(async () => {
		await db.delete(links);
	});

	it("should be able to list links with pagination and total", async () => {
		await makeLink({
			shortenedUrl: "older",
			createdAt: new Date("2026-06-01T00:00:00.000Z"),
		});
		await makeLink({
			shortenedUrl: "newer",
			createdAt: new Date("2026-06-02T00:00:00.000Z"),
		});

		const result = await getLinks({ page: 1, pageSize: 1 });

		expect(isRight(result)).toBe(true);
		expect(unwrapEither(result)).toEqual({
			total: 2,
			links: [expect.objectContaining({ shortenedUrl: "newer" })],
		});
	});

	it("should be able to filter links by search", async () => {
		await makeLink({ shortenedUrl: "rocketseat" });
		await makeLink({ shortenedUrl: "ignite" });

		const result = await getLinks({ search: "rock", page: 1, pageSize: 20 });

		expect(isRight(result)).toBe(true);
		expect(unwrapEither(result)).toEqual({
			total: 1,
			links: [expect.objectContaining({ shortenedUrl: "rocketseat" })],
		});
	});

	it("should return empty list when no records exist", async () => {
		const result = await getLinks({ page: 1, pageSize: 20 });

		expect(isRight(result)).toBe(true);
		expect(unwrapEither(result)).toEqual({ total: 0, links: [] });
	});
});
