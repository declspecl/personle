import { getUserGuesses } from "../lib/ddb.js";
import { getDailyPersona } from "../lib/s3.js";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { generateNewHashedUserSessionId, getUserSessionCookie, buildResponseWithUserSessionCookie } from "../utils.js";

interface GetUserGuessesResponse {
	guesses: string[];
	todayPersona: string;
}

export const getDailyGuesses = async (event: APIGatewayProxyEventV2): Promise<any> => {
	try {
		let userId;
		let setCookieHeader = undefined;

		const userSessionCookie = getUserSessionCookie(event);

		if (userSessionCookie) {
			userId = userSessionCookie;
		} else {
			userId = generateNewHashedUserSessionId();
			const cookieResponse = buildResponseWithUserSessionCookie(userId);
			setCookieHeader = cookieResponse.headers;
		}

		const todayPersona = await getDailyPersona();
		const guesses = await getUserGuesses(userId);

		const response: GetUserGuessesResponse = {
			guesses: guesses,
			todayPersona: todayPersona
		};

		const returnVal = {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json",
				...setCookieHeader
			},
			body: JSON.stringify(response)
		};
		return returnVal;
	} catch (error: any) {
		console.error("Validation error:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: "Validation error", error: error.errors })
		};
	}
};
