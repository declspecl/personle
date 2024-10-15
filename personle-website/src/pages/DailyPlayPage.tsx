import { cn } from "~/lib/utils";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { PersonaData } from "~/lib/server/model";
import { MessageBox } from "~/components/ui/MessageBox";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DateWithDay } from "~/components/typography/DateWithDay";
import { getDailyGuesses, makeDailyGuess } from "~/lib/server/api";
import { usePersonaDataByName } from "~/context/PersonaDataContext";
import { GuessesTable } from "~/components/play/table/GuessesTable";
import { NewspaperText } from "~/components/typography/NewspaperText";
import { MakeGuessController } from "~/components/play/MakeGuessController";

interface UserGuessManagerProps {
    todayPersona: PersonaData;
    initialGuesses: PersonaData[];
    selectedPersona: PersonaData | null;
    setSelectedPersona: React.Dispatch<React.SetStateAction<PersonaData | null>>
}

function UserGuessManager({ todayPersona, initialGuesses, selectedPersona, setSelectedPersona }: UserGuessManagerProps) {
    const queryClient = useQueryClient();
    const personaDataByName = usePersonaDataByName();
    const [guesses, setGuesses] = useState<PersonaData[]>(initialGuesses);

    return (
        <div>
            <MakeGuessController
                selectedPersona={selectedPersona}
                setSelectedPersona={setSelectedPersona}
                onClick={async (guess: PersonaData) => {
                    const res =  await makeDailyGuess(guess.name);

                    if (res.status === 200 || res.status === 204) {
                        setGuesses((prev) => [...prev, personaDataByName[guess.name]]);
                        queryClient.invalidateQueries({
                            queryKey: ["getDailyGuesses"]
                        });
                    }
                    else {
                        console.error("You've made too many guesses today!");
                    }
                }}
            />

            <GuessesTable
                className="my-8"
                guesses={guesses}
                correctPersona={todayPersona}
                selectedPersona={selectedPersona}
            />
        </div>
    );
}

export function DailyPlayPage() {
    const personaDataByName = usePersonaDataByName();
    const { isPending, error, data } = useQuery({
        queryKey: ["getDailyGuesses"],
        queryFn: getDailyGuesses
    })
    const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(null);

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
                <UserGuessManager
                    todayPersona={personaDataByName[data.todayPersona]}
                    initialGuesses={data.guesses.map((guess) => personaDataByName[guess])}
                    selectedPersona={selectedPersona}
                    setSelectedPersona={setSelectedPersona}
                />
            )}
        </div>
    );
}