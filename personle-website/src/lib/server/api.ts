const API_GATEWAY_URL = "https://u9kvcstat0.execute-api.us-east-2.amazonaws.com/api/daily-guesses";

export interface GetDailyGuessesResponse {
	todayPersona: string;
	guesses: string[];
}

export async function getDailyGuesses(): Promise<GetDailyGuessesResponse> {
	return fetch(API_GATEWAY_URL, {
		method: "GET",
		credentials: "include"
	}).then((response) => response.json());
}

export async function makeDailyGuess(persona: string): Promise<Response> {
	return fetch(API_GATEWAY_URL, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			guess: persona
		})
	});
}
