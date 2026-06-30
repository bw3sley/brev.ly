import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	test: {
		environment: "node",
		fileParallelism: false,
		env: {
			DATABASE_URL: "postgresql://docker:docker@localhost:5432/brevly_test",
			PORT: "3333",
			NODE_ENV: "test",
			CLOUDFLARE_ACCOUNT_ID: "test-account",
			CLOUDFLARE_ACCESS_KEY_ID: "test-access-key",
			CLOUDFLARE_SECRET_ACCESS_KEY: "test-secret-key",
			CLOUDFLARE_BUCKET: "test-bucket",
			CLOUDFLARE_PUBLIC_URL: "https://storage.com/bucket/",
		},
	},
});
