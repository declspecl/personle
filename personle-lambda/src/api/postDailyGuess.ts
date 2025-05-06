import { z } from "zod";
import { saveUserGuess } from "../lib/ddb.js";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { buildResponseWithUserSessionCookie, generateNewHashedUserSessionId, getUserSessionCookie } from "../utils.js";

interface PostUserGuessRequest {
	guess: string;
}

const userGuessSchema = z.object({
	guess: z.string()
});

export const postDailyGuess = async (event: APIGatewayProxyEventV2): Promise<any> => {
	try {
		const requestBody: PostUserGuessRequest = JSON.parse(event.body || "{}");
		const validatedBody = userGuessSchema.parse(requestBody);
		const guess: string = validatedBody.guess;
		let userId;
		let setCookieHeader = undefined;

		const userSessionCookie = getUserSessionCookie(event);

		if (userSessionCookie) {
			console.log("User session cookie found:", userSessionCookie);
			userId = userSessionCookie;
		} else {
			console.log("User session cookie not found, generating new user ID");
			userId = generateNewHashedUserSessionId();
			const cookieResponse = buildResponseWithUserSessionCookie(userId);
			setCookieHeader = cookieResponse.headers;
		}

		await saveUserGuess(userId, guess);

		return {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json",
				...setCookieHeader
			},
			body: JSON.stringify({ message: "Guess submitted successfully" })
		};
	} catch (error: any) {
		console.error("Validation error:", error);
		return {
			statusCode: 400,
			body: JSON.stringify({ message: "Validation error", error: error.errors })
		};
	}
};
