import { beforeEach, describe, expect, it } from "vitest";
import { LinkNotFoundError } from "@/app/errors/link-not-found-error";
import { incrementLinkAccessCount } from "@/app/functions/increment-link-access-count";
import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas";
import { isRight, unwrapEither } from "@/shared/either";
import { makeLink } from "@/test/factories/make-link";

describe("Increment link access count", () => {
	beforeEach(async () => {
		await db.delete(links);
	});

	it("should be able to increment link access count", async () => {
		await makeLink({ shortenedUrl: "rocketseat", accessCount: 2 });

		const result = await incrementLinkAccessCount({
			shortenedUrl: "rocketseat",
		});

		expect(isRight(result)).toBe(true);
		expect(unwrapEither(result)).toEqual(
			expect.objectContaining({ shortenedUrl: "rocketseat", accessCount: 3 }),
		);
	});

	it("should not increment missing link", async () => {
		const result = await incrementLinkAccessCount({ shortenedUrl: "missing" });

		expect(isRight(result)).toBe(false);
		expect(unwrapEither(result)).toBeInstanceOf(LinkNotFoundError);
	});
});
