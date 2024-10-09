import { useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { DateWithDay } from "~/components/typography/DateWithDay";
import { NewspaperText } from "~/components/typography/NewspaperText";
import { Button } from "~/components/ui/Button";
import { PersonaCombobox } from "~/components/ui/PersonaCombobox";
import { MessageBox } from "~/components/ui/MessageBox";
import { Skeleton } from "~/components/ui/Skeleton";
import { addGuess, getGuesses, GetGuessesResponse } from "~/lib/backend/api";
import { cn } from "~/lib/utils";
import { PersonaData } from "~/lib/backend/model";

interface MakeGuessControllerProps {
    onClick?: (guess: PersonaData) => void
}

function MakeGuessController({ onClick }: MakeGuessControllerProps) {
    const [selectedGuess, setSelectedGuess] = useState<PersonaData | null>(null);

    return (
        <div className="w-full flex flex-col gap-4 sm:flex-row sm:items-center">
            <MessageBox fromSide="left" className="text-white" deltaWidthRem={1}>
                <PersonaCombobox selectedPersonaData={selectedGuess} setSelectedPersonaData={setSelectedGuess} onSelect={setSelectedGuess} />
            </MessageBox>

            <Button palette="whiteText" size="md" onClick={() => {
                console.log("yo");
                if (!selectedGuess) return;

                if (onClick) {
                    onClick(selectedGuess);
                }

                setSelectedGuess(null);
            }}>
                Submit guess
            </Button>
        </div>
    );
}

function UserGuessManager() {
    const navigate = useNavigate();

    const [todayPersona, setTodayPersona] = useState<string>(null!)
    const [guesses, setGuesses] = useState<string[]>([]);

    return (
        <>
            <MakeGuessController onClick={async (guess: PersonaData) => {
                setGuesses([...guesses, guess.name]);

                console.log(document.cookie);

                if (document.cookie.includes("session=")) {
                    const response = await fetch("http://localhost:3345/guess", {
                        method: "PUT",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            persona_guess: guess.name
                        })
                    });

                    response.headers.getSetCookie().forEach(cookie => {
                        document.cookie = cookie;
                    });

                    console.log(response);
                }
            }} />

            <Suspense fallback={<Skeleton deltaWidthRem={1} skewDirection="right" className="w-20 h-20" />}>
                <div className="text-white">
                    <h1>{todayPersona}</h1>

                    <ul>
                        {guesses.map(guess => (
                            <li key={guess}>{guess}</li>
                        ))}
                    </ul>
                </div>
            </Suspense>
        </>
    );
}

export function PlayPage() {
    const data = useLoaderData();

    console.log(data);

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

            <UserGuessManager />
        </div>
    );
}