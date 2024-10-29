import { Client, QueryResult } from "pg";

export async function executeQuery(
	statement: string,
	...values: any[]
): Promise<QueryResult<any>> {
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
	});

	await client.connect();

	const result = await client.query(statement, values);

	client.end();

	return result;
}
