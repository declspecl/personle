import { useState } from "react";
import { PersonaData } from "~/lib/server/model";
import { DateWithDay } from "~/components/typography/DateWithDay";
import { usePersonaDataByName, usePersonaNames } from "~/context/PersonaDataContext";
import { MakeGuessController } from "~/components/play/MakeGuessController";
import { GuessesTable } from "~/components/play/table/GuessesTable";

interface UserGuessManagerProps {
    correctPersona: PersonaData;
    selectedPersona: PersonaData | null;
    setSelectedPersona: React.Dispatch<React.SetStateAction<PersonaData | null>>;
    onCorrectGuess: () => void;
}

function UserGuessManager({ correctPersona, selectedPersona, setSelectedPersona, onCorrectGuess }: UserGuessManagerProps) {
    const personaDataByName = usePersonaDataByName();
    const [guesses, setGuesses] = useState<PersonaData[]>([]);

    return (
        <div>
            <MakeGuessController
                selectedPersona={selectedPersona}
                setSelectedPersona={setSelectedPersona}
                onClick={(guess: PersonaData) => {
                    setGuesses((prev) => [...prev, personaDataByName[guess.name]]);

                    if (guess.name === correctPersona.name) {
                        onCorrectGuess();
                    }
                }}
            />

            <GuessesTable
                className="my-8"
                guesses={guesses}
                correctPersona={correctPersona}
                selectedPersona={selectedPersona}
            />
        </div>
    );
}

export function FreePlayPage() {
    const allPersonaNames = usePersonaNames();
    const personaDataByName = usePersonaDataByName();

    const [unseenPersonaNames, setUnseenPersonaNames] = useState<string[]>(allPersonaNames);
    const [correctPersona, setCorrectPersona] = useState<PersonaData>(personaDataByName[unseenPersonaNames[Math.floor(Math.random() * unseenPersonaNames.length)]]);
    const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(null);

    return (
        <>
            <DateWithDay className="self-start text-[min(7.5vw,2.5rem)] -rotate-[24deg]" />

            <div>
                <UserGuessManager
                    correctPersona={correctPersona}
                    selectedPersona={selectedPersona}
                    setSelectedPersona={setSelectedPersona}
                    onCorrectGuess={() => {
                        setTimeout(() => {
                            alert("Correct! Go back to the home page and come back for a new persona (:skull:)");
                        }, 3000)
                    }}
                />
            </div>
        </>
    );
}