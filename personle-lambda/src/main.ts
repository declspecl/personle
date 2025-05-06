import { postDailyGuess } from "./api/postDailyGuess.js";
import { getDailyGuesses } from "./api/getDailyGuesses.js";
import { APIGatewayProxyEventV2, Handler } from "aws-lambda";

export const handler: Handler<APIGatewayProxyEventV2, any> = async (event: APIGatewayProxyEventV2) => {
	console.log("Received event:", JSON.stringify(event, null, 2));

	const path = event.requestContext.http.path;
	const httpMethod = event.requestContext.http.method;

	if (path === "/api/daily-guesses" && httpMethod === "GET") {
		return getDailyGuesses(event);
	} else if (path === "/api/daily-guesses" && httpMethod === "POST") {
		return postDailyGuess(event);
	} else {
		return {
			statusCode: 404,
			body: JSON.stringify({ message: "Not Found" })
		};
	}
};
