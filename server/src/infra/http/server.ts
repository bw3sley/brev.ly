import { fastifyCors } from "@fastify/cors";
import { fastifyMultipart } from "@fastify/multipart";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";

import { env } from "@/env";

import { createLinkRoute } from "@/infra/http/routes/create-link";
import { deleteLinkRoute } from "@/infra/http/routes/delete-link";
import { exportLinksToCsvRoute } from "@/infra/http/routes/export-links-to-csv";
import { getLinksRoute } from "@/infra/http/routes/get-links";
import { getOriginalUrlByShortenedUrlRoute } from "@/infra/http/routes/get-original-url-by-shortened-url";
import { incrementLinkAccessCountRoute } from "@/infra/http/routes/increment-link-access-count";

import { transformSwaggerSchema } from "./transform-swagger-schema";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, _, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		console.log(error.validation);

		return reply
			.status(400)
			.send({ message: "Validation error", issues: error.validation });
	}

	console.log(error);

	return reply.status(500).send({ message: "Internal server error" });
});

server.register(fastifyCors, {
	origin: "*",
	methods: ["GET", "POST", "PATCH", "DELETE"],
});

server.register(fastifyMultipart);

server.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Brev.ly server",
			version: "1.0.0",
		},
	},

	transform: transformSwaggerSchema,
});

server.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

server.register(createLinkRoute);
server.register(deleteLinkRoute);
server.register(exportLinksToCsvRoute);
server.register(getOriginalUrlByShortenedUrlRoute);
server.register(getLinksRoute);
server.register(incrementLinkAccessCountRoute);

server.get("/openapi.json", () => server.swagger());

server.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
	console.log(`🔥 HTTP server running on http://localhost:${env.PORT}`);
});
