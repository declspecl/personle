import { useState } from "react";
import { cn } from "~/lib/utils";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DateWithDay } from "~/components/typography/DateWithDay";
import { NewspaperText } from "~/components/typography/NewspaperText";
import { Button } from "~/components/ui/Button";
import { PersonaCombobox } from "~/components/ui/PersonaCombobox";
import { MessageBox } from "~/components/ui/MessageBox";
import { PersonaData } from "~/lib/server/model";
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
                console.log("yo");
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
    const [guesses, setGuesses] = useState<string[]>(getGuessesResponse.guesses);

    return (
        <div>
            <MakeGuessController onClick={async (guess: PersonaData) => {
                const res =  await makeGuess(guess.name);
                if (res.status === 200 || res.status === 204) {
                    setGuesses([...guesses, guess.name]);
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
        queryKey: ["guesses"],
        queryFn: async () => {
            const response = await getGuesses();
            return await response.json() as GetGuessesResponse;
        }
    })

    if (error) {
        throw error;
    }

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

            {data && (
                <UserGuessManager getGuessesResponse={data} />
            )}
        </div>
    );
}