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