import * as esbuild from "esbuild";

await esbuild.build({
	entryPoints: ["node_modules/graphql_api/src/index.ts"],
	bundle: true,
	outfile: "dist/build/graphql_api/index.js",
	platform: "node",
	target: "node20",
	minify: true,
});

console.log("GraphQL API lambda built!");

await esbuild.build({
	entryPoints: ["node_modules/db_migration/src/index.ts"],
	bundle: true,
	outfile: "dist/build/db_migration/index.js",
	platform: "node",
	target: "node20",
	minify: true,
});

console.log("DB migration lambda built!");