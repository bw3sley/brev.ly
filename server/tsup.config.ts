import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/infra/http/server.ts"],
	format: ["esm"],
	platform: "node",
	target: "node22",
	clean: true,
	dts: false,
	outDir: "dist",
	tsconfig: "tsconfig.json",
});
