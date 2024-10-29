import { Client } from "pg";
import { dropQuery } from "./sql/drop";
import { createSchemaQuery } from "./sql/schema";
import { seedQuery } from "./sql/seed";

let client: Client;

export async function handler() {
	if (!client) {
		client = new Client({
			connectionString: process.env.DATABASE_URL,
		});
		await client.connect();
		console.log("Connected");
	}

	try {
		await client.query(dropQuery);
		console.log("Drop tables query complete");

		await client.query(createSchemaQuery);
		console.log("Create schema query complete");

		await client.query(seedQuery);
		console.log("Seed db query complete");

		return {
			statusCode: 200,
			body: JSON.stringify({ message: "DB migration complete" }),
		};
	} catch (err: any) {
		console.error("Database error:", err);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Error updating database schema",
				error: err.message,
			}),
		};
	} finally {
		await client.end();
	}
}
