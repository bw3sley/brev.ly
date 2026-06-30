import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { LinkNotFoundError } from "@/app/errors/link-not-found-error";
import { incrementLinkAccessCount } from "@/app/functions/increment-link-access-count";
import { isRight, unwrapEither } from "@/shared/either";

export const incrementLinkAccessCountRoute: FastifyPluginAsyncZod = async (
	server,
) => {
	server.route({
		method: "PATCH",
		url: "/links/:shortenedUrl/access",
		schema: {
			summary: "Increment link access count",
			tags: ["links"],
			params: z.object({ shortenedUrl: z.string().regex(/^[a-zA-Z0-9_-]+$/) }),
			response: {
				200: z.object({
					id: z.string(),
					originalUrl: z.string(),
					shortenedUrl: z.string(),
					accessCount: z.number(),
					createdAt: z.date(),
					lastAccessedAt: z.date(),
				}),
				404: z.object({ message: z.string() }),
			},
		},
		handler: async (request, reply) => {
			const result = await incrementLinkAccessCount(request.params);

			if (isRight(result)) {
				return reply.status(200).send(unwrapEither(result));
			}

			const error = unwrapEither(result);

			switch (error.constructor.name) {
				case LinkNotFoundError.name:
					return reply.status(404).send({ message: error.message });
				default:
					throw error;
			}
		},
	});
};
