import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { USER_SESSION_COOKIE_NAME } from "./constants.js";

export const generateNewHashedUserSessionId = (): string => {
	const uuid = uuidv4();
	return hashUserSessionId(uuid);
};

export const hashUserSessionId = (userSessionId: string): string => {
	const hmac = crypto.createHmac("sha256", process.env.HASHING_SECRET_KEY);
	hmac.update(userSessionId);
	return hmac.digest("hex");
};

export const getCookie = (event: APIGatewayProxyEventV2, name: string): string | undefined => {
	if (!event.cookies) {
		return undefined;
	}

	for (const cookie of event.cookies) {
		const [cookieName, cookieValue] = cookie.trim().split("=");
		if (cookieName === name) {
			return cookieValue;
		}
	}
	return undefined;
};

export const getUserSessionCookie = (event: any): string | undefined => {
	return getCookie(event, USER_SESSION_COOKIE_NAME);
};

export const buildResponseWithUserSessionCookie = (hashedUserSessionId: string): any => {
	return {
		headers: {
			"Set-Cookie": `${USER_SESSION_COOKIE_NAME}=${hashedUserSessionId}; Path=/; Secure; SameSite=None; Max-Age=31536000`,
		}
	};
};
