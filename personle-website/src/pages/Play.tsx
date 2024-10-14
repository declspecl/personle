import { useState } from "react";
import { cn } from "~/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "~/components/ui/Button";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { PersonaData } from "~/lib/server/model";
import { MessageBox } from "~/components/ui/MessageBox";
import { PersonaCombobox } from "~/components/ui/PersonaCombobox";
import { DateWithDay } from "~/components/typography/DateWithDay";
import { NewspaperText } from "~/components/typography/NewspaperText";
import { getGuesses, GetGuessesResponse, makeGuess } from "~/lib/server/api";

interface MakeGuessControllerProps {
    onClick?: (guess: PersonaData) => void
}

function MakeGuessController({ onClick }: MakeGuessControllerProps) {
    const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(null);

    return (
        <div className="w-full flex flex-col gap-4 sm:flex-row sm:items-center">
            <MessageBox fromSide="left" className="text-white" deltaWidthRem={1}>
                <PersonaCombobox selectedPersona={selectedPersona} setSelectedPersona={setSelectedPersona} onSelect={setSelectedPersona} />
            </MessageBox>

            <Button palette="whiteText" size="md" onClick={() => {
                if (!selectedPersona) return;

                if (onClick) {
                    onClick(selectedPersona);
                }

                setSelectedPersona(null);
            }}>
                Submit guess
            </Button>
        </div>
    );
}

interface UserGuessManagerProps {
    getGuessesResponse: GetGuessesResponse
}

function UserGuessManager({ getGuessesResponse }: UserGuessManagerProps) {
    const queryClient = useQueryClient();
    const [guesses, setGuesses] = useState<string[]>(getGuessesResponse.guesses);

    return (
        <div>
            <MakeGuessController onClick={async (guess: PersonaData) => {
                const res =  await makeGuess(guess.name);

                if (res.status === 200 || res.status === 204) {
                    setGuesses((prev) => [...prev, guess.name]);
                    queryClient.invalidateQueries({
                        queryKey: ["getGuesses"]
                    });
                }
                else {
                    console.error("You've made too many guesses today!");
                }
            }} />

            <div className="text-white">
                <ul>
                    {guesses.map(guess => (
                        <li key={guess}>{guess}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export function PlayPage() {
    const { isPending, error, data } = useQuery({
        queryKey: ["getGuesses"],
        queryFn: getGuesses
    })

    return (
        <div className="w-full flex flex-col gap-4">
            <Link to="/">
                <NewspaperText
                    text="Personle!"
                    redLetters={["o"]}
                    element="h1"
                    palette="whiteOnTransparent"
                    className={cn(
                        "mx-auto w-fit block text-[min(12.5vw,5rem)]"
                    )}
                />
            </Link>

            <DateWithDay className="self-start text-[min(7.5vw,2.5rem)] -rotate-[24deg]" />

            <div className="w-full flex flex-row justify-end">
                <MessageBox fromSide="right" className="text-white" deltaWidthRem={1}>
                    <p>Guess today's Persona!</p>
                </MessageBox>
            </div>

            {isPending ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error.message}</p>
            ) : data && (
                <UserGuessManager getGuessesResponse={data} />
            )}
        </div>
    );
}