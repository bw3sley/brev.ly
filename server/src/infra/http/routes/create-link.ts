import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { LinkAlreadyExistsError } from "@/app/errors/link-already-exists-error";
import { createLink } from "@/app/functions/create-link";
import { isRight, unwrapEither } from "@/shared/either";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.route({
		method: "POST",
		url: "/links",
		schema: {
			summary: "Create link",
			tags: ["links"],
			body: z.object({
				originalUrl: z.url(),
				shortenedUrl: z.string().regex(/^[a-zA-Z0-9_-]+$/),
			}),
			response: {
				201: z.object({
					id: z.string(),
					originalUrl: z.string(),
					shortenedUrl: z.string(),
					accessCount: z.number(),
					createdAt: z.date(),
					lastAccessedAt: z.date(),
				}),
				409: z.object({
					message: z.string(),
				}),
			},
		},
		handler: async (request, reply) => {
			const result = await createLink(request.body);

			if (isRight(result)) {
				return reply.status(201).send(unwrapEither(result));
			}

			const error = unwrapEither(result);

			switch (error.constructor.name) {
				case LinkAlreadyExistsError.name:
					return reply.status(409).send({ message: error.message });
				default:
					throw error;
			}
		},
	});
};
