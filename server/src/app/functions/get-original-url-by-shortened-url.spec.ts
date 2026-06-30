import { beforeEach, describe, expect, it } from "vitest";
import { LinkNotFoundError } from "@/app/errors/link-not-found-error";
import { getOriginalUrlByShortenedUrl } from "@/app/functions/get-original-url-by-shortened-url";
import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas";
import { isRight, unwrapEither } from "@/shared/either";
import { makeLink } from "@/test/factories/make-link";

describe("Get original url by shortened url", () => {
	beforeEach(async () => {
		await db.delete(links);
	});

	it("should be able to get original url by shortened url", async () => {
		await makeLink({
			shortenedUrl: "rocketseat",
			originalUrl: "https://rocketseat.com.br",
		});

		const result = await getOriginalUrlByShortenedUrl({
			shortenedUrl: "rocketseat",
		});

		expect(isRight(result)).toBe(true);
		expect(unwrapEither(result)).toEqual({
			originalUrl: "https://rocketseat.com.br",
		});
	});

	it("should not be able to get original url for missing shortened url", async () => {
		const result = await getOriginalUrlByShortenedUrl({
			shortenedUrl: "missing",
		});

		expect(isRight(result)).toBe(false);
		expect(unwrapEither(result)).toBeInstanceOf(LinkNotFoundError);
	});
});
