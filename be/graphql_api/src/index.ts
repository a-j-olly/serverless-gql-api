import {
	APIGatewayEventRequestContextV2,
	APIGatewayProxyEventV2,
	APIGatewayProxyResultV2,
} from "aws-lambda";
import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

const yoga = createYoga<{
	event: APIGatewayProxyEventV2;
	lambdaContext: APIGatewayEventRequestContextV2;
}>({
	graphqlEndpoint: "/graphql",
	landingPage: false,
	schema: createSchema({
		typeDefs,
		resolvers,
	}),
});

export async function handler(
	event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
	try {
		const path = event.rawPath;
		const response = await yoga.fetch(
			path,
			{
				method: event.requestContext.http.method,
				headers: event.headers as HeadersInit,
				body: event.body
					? Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf8")
					: undefined,
			},
			{
				event,
				lambdaContext: event.requestContext,
			}
		);

		const responseHeaders = Object.fromEntries(response.headers.entries());

		return {
			statusCode: response.status,
			headers: responseHeaders,
			body: await response.text(),
			isBase64Encoded: false,
		};
	} catch (error) {
		console.log("Handler caught the following error: ", error);
		throw error;
	}
}
