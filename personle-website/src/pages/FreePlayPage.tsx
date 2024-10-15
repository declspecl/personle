import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { Link } from "react-router-dom";
import { PersonaData } from "~/lib/server/model";
import { DateWithDay } from "~/components/typography/DateWithDay";
import { NewspaperText } from "~/components/typography/NewspaperText";
import { usePersonaDataByName, usePersonaNames } from "~/context/PersonaDataContext";

export function FreePlayPage() {
    const personaNames = usePersonaNames();
    const personaDataByName = usePersonaDataByName();
    const seenPersonas = useState<string[]>([])[0];
    const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(null);

    useEffect(() => {
        setSelectedPersona(personaDataByName[personaNames[Math.random() * personaNames.length | 0]]);
    }, [])

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

            <p className="text-white">{selectedPersona?.name}</p>
        </div>
    );
}