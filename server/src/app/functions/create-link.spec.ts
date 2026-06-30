import { beforeEach, describe, expect, it } from "vitest";
import { LinkAlreadyExistsError } from "@/app/errors/link-already-exists-error";
import { createLink } from "@/app/functions/create-link";
import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas";
import { isRight, unwrapEither } from "@/shared/either";
import { makeLink } from "@/test/factories/make-link";

describe("Create link", () => {
	beforeEach(async () => {
		await db.delete(links);
	});

	it("should be able to create link", async () => {
		const result = await createLink({
			originalUrl: "https://rocketseat.com.br/evento",
			shortenedUrl: "rocketseat-evento",
		});

		expect(isRight(result)).toBe(true);
		expect(unwrapEither(result)).toEqual(
			expect.objectContaining({
				originalUrl: "https://rocketseat.com.br/evento",
				shortenedUrl: "rocketseat-evento",
				accessCount: 0,
			}),
		);
	});

	it("should not be able to create link with duplicated shortened url", async () => {
		await makeLink({ shortenedUrl: "rocketseat-evento" });

		const result = await createLink({
			originalUrl: "https://rocketseat.com.br/evento",
			shortenedUrl: "rocketseat-evento",
		});

		expect(isRight(result)).toBe(false);
		expect(unwrapEither(result)).toBeInstanceOf(LinkAlreadyExistsError);
	});

	it("should reject malformed shortened url", async () => {
		await expect(
			createLink({
				originalUrl: "https://rocketseat.com.br/evento",
				shortenedUrl: "bad slug",
			}),
		).rejects.toThrow(/Invalid string/);
	});
});
