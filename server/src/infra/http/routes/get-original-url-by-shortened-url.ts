import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { LinkNotFoundError } from "@/app/errors/link-not-found-error";
import { getOriginalUrlByShortenedUrl } from "@/app/functions/get-original-url-by-shortened-url";
import { isRight, unwrapEither } from "@/shared/either";

export const getOriginalUrlByShortenedUrlRoute: FastifyPluginAsyncZod = async (
	server,
) => {
	server.route({
		method: "GET",
		url: "/links/:shortenedUrl/original-url",
		schema: {
			summary: "Get original URL by shortened URL",
			tags: ["links"],
			params: z.object({ shortenedUrl: z.string().regex(/^[a-zA-Z0-9_-]+$/) }),
			response: {
				200: z.object({ originalUrl: z.string() }),
				404: z.object({ message: z.string() }),
			},
		},
		handler: async (request, reply) => {
			const result = await getOriginalUrlByShortenedUrl(request.params);

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
