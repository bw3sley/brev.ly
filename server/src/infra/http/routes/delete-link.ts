import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { LinkNotFoundError } from "@/app/errors/link-not-found-error";
import { deleteLink } from "@/app/functions/delete-link";
import { isRight, unwrapEither } from "@/shared/either";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.route({
		method: "DELETE",
		url: "/links/:shortenedUrl",
		schema: {
			summary: "Delete link",
			tags: ["links"],
			params: z.object({ shortenedUrl: z.string().regex(/^[a-zA-Z0-9_-]+$/) }),
			response: {
				200: z.object({ shortenedUrl: z.string() }),
				404: z.object({ message: z.string() }),
			},
		},
		handler: async (request, reply) => {
			const result = await deleteLink(request.params);

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
