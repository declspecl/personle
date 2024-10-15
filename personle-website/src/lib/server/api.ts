const API_BASE_URL = "/api";
const DAILY_API_BASE_URL = `${API_BASE_URL}/daily`;

export interface GetDailyGuessesResponse {
    todayPersona: string;
    guesses: string[];
}

export async function getDailyGuesses(): Promise<GetDailyGuessesResponse> {
    return fetch(`${DAILY_API_BASE_URL}/guess`, {
        method: "GET",
        credentials: "include"
    }).then(response => response.json());
}

export async function makeDailyGuess(persona: string): Promise<Response> {
    return fetch(`${DAILY_API_BASE_URL}/guess`, {
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
