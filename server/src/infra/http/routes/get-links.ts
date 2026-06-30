import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getLinks } from "@/app/functions/get-links";
import { unwrapEither } from "@/shared/either";

export const getLinksRoute: FastifyPluginAsyncZod = async (server) => {
	server.route({
		method: "GET",
		url: "/links",
		schema: {
			summary: "List links",
			tags: ["links"],
			querystring: z.object({
				page: z.coerce.number().optional().default(1),
				pageSize: z.coerce.number().optional().default(20),
				search: z.string().optional(),
			}),
			response: {
				200: z.object({
					total: z.number(),
					links: z.array(
						z.object({
							id: z.string(),
							originalUrl: z.string(),
							shortenedUrl: z.string(),
							accessCount: z.number(),
							createdAt: z.date(),
							lastAccessedAt: z.date(),
						}),
					),
				}),
			},
		},
		handler: async (request, reply) => {
			const result = await getLinks(request.query);

			return reply.status(200).send(unwrapEither(result));
		},
	});
};
