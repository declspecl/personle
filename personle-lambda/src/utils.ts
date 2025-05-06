import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { HASHING_SECRET_KEY, USER_SESSION_COOKIE_NAME } from "./constants.js";

export const generateNewHashedUserSessionId = (): string => {
	const uuid = uuidv4();
	return hashUserSessionId(uuid);
};

export const hashUserSessionId = (userSessionId: string): string => {
	const hmac = crypto.createHmac("sha256", HASHING_SECRET_KEY);
	hmac.update(userSessionId);
	return hmac.digest("base64");
};

export const getCookie = (event: any, name: string): string | undefined => {
	const cookieString = event.headers.cookie;
	if (!cookieString) {
		return undefined;
	}

	const cookies = cookieString.split(";");
	for (const cookie of cookies) {
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
	const base64UserSessionId = Buffer.from(hashedUserSessionId).toString("base64");

	return {
		headers: {
			"Set-Cookie": `${USER_SESSION_COOKIE_NAME}=${base64UserSessionId}; Path=/; Secure; SameSite=None; Max-Age=31536000`,
		}
	};
};
