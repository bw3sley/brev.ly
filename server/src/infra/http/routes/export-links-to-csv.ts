import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { exportLinksToCsv } from "@/app/functions/export-links-to-csv";
import { unwrapEither } from "@/shared/either";

export const exportLinksToCsvRoute: FastifyPluginAsyncZod = async (server) => {
	server.route({
		method: "POST",
		url: "/links/export",
		schema: {
			summary: "Export links to CSV",
			tags: ["links"],
			response: {
				200: z.object({ url: z.string() }),
			},
		},
		handler: async (_, reply) => {
			const result = await exportLinksToCsv();

			return reply.status(200).send(unwrapEither(result));
		},
	});
};
