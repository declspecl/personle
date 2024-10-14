import React, { useState } from "react";
import { cn } from "~/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "~/components/ui/Button";
import { PersonaData } from "~/lib/server/model";
import { MessageBox } from "~/components/ui/MessageBox";
import { getGuesses, makeGuess } from "~/lib/server/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DateWithDay } from "~/components/typography/DateWithDay";
import { SkewedContainer } from "~/components/ui/SkewedContainer";
import { PersonaCombobox } from "~/components/play/PersonaCombobox";
import { NewspaperText } from "~/components/typography/NewspaperText";
import { usePersonaDataByName } from "~/context/PersonaDataContext";
import { GuessesTable } from "~/components/play/table/GuessesTable";

interface MakeGuessControllerProps {
    selectedPersona: PersonaData | null;
    setSelectedPersona: React.Dispatch<React.SetStateAction<PersonaData | null>>;
    onClick?: (guess: PersonaData) => void;
}

function MakeGuessController({ selectedPersona, setSelectedPersona, onClick }: MakeGuessControllerProps) {
    return (
        <div className="w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
            <MessageBox fromSide="left" className="text-white" deltaWidthRem={1}>
                <PersonaCombobox selectedPersona={selectedPersona} setSelectedPersona={setSelectedPersona} onSelect={setSelectedPersona} />
            </MessageBox>

            <SkewedContainer skewDirection="left" deltaWidthRem={0.5} className="mx-auto sm:mx-0 p-1 w-fit bg-white">
                <SkewedContainer skewDirection="left" deltaWidthRem={0.5} className="w-fit bg-black">
                    <Button rotate={false} skewMagnitude="none" palette="whiteText" size="md" onClick={() => {
                        if (!selectedPersona) return;

                        if (onClick) {
                            onClick(selectedPersona);
                        }

                        setSelectedPersona(null);
                    }}>
                        Submit guess
                    </Button>
                </SkewedContainer>
            </SkewedContainer>
        </div>
    );
}

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
                    const res =  await makeGuess(guess.name);

                    if (res.status === 200 || res.status === 204) {
                        setGuesses((prev) => [...prev, personaDataByName[guess.name]]);
                        queryClient.invalidateQueries({
                            queryKey: ["getGuesses"]
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
                todayPersona={todayPersona}
                selectedPersona={selectedPersona}
            />
        </div>
    );
}

export function PlayPage() {
    const personaDataByName = usePersonaDataByName();
    const { isPending, error, data } = useQuery({
        queryKey: ["getGuesses"],
        queryFn: getGuesses
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