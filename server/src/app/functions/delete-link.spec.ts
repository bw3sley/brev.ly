import { beforeEach, describe, expect, it } from "vitest";
import { LinkNotFoundError } from "@/app/errors/link-not-found-error";
import { deleteLink } from "@/app/functions/delete-link";
import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas";
import { isRight, unwrapEither } from "@/shared/either";
import { makeLink } from "@/test/factories/make-link";

describe("Delete link", () => {
	beforeEach(async () => {
		await db.delete(links);
	});

	it("should be able to delete link", async () => {
		await makeLink({ shortenedUrl: "delete-me" });

		const result = await deleteLink({ shortenedUrl: "delete-me" });

		expect(isRight(result)).toBe(true);
		expect(unwrapEither(result)).toEqual({ shortenedUrl: "delete-me" });
		expect(await db.query.links.findFirst()).toBeUndefined();
	});

	it("should not be able to delete missing link", async () => {
		const result = await deleteLink({ shortenedUrl: "missing" });

		expect(isRight(result)).toBe(false);
		expect(unwrapEither(result)).toBeInstanceOf(LinkNotFoundError);
	});
});
