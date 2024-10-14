const BASE_URL = "/api";

export interface GetGuessesResponse {
    todayPersona: string,
    guesses: string[]
}

export async function getGuesses(): Promise<GetGuessesResponse> {
    return fetch(`${BASE_URL}/guess`, {
        method: "GET",
        credentials: "include"
    }).then(response => response.json());
}

export async function makeGuess(persona: string): Promise<Response> {
    return fetch(`${BASE_URL}/guess`, {
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