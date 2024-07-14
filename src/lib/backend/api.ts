export interface GetGuessesResponse {
    persona: string,
    guesses: string[]
}

export async function getGuesses(): Promise<GetGuessesResponse> {
    return fetch("http://localhost:3345/guess", {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export async function addGuess(persona: string): Promise<Response> {
    return fetch("http://localhost:3345/guess", {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            persona_guess: persona
        })
    });
}