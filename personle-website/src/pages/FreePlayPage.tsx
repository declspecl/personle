import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { Link } from "react-router-dom";
import { PersonaData } from "~/lib/server/model";
import { DateWithDay } from "~/components/typography/DateWithDay";
import { NewspaperText } from "~/components/typography/NewspaperText";
import { usePersonaDataByName, usePersonaNames } from "~/context/PersonaDataContext";
import { Button } from "~/components/ui/Button";
import { GuessesTable } from "~/components/play/table/GuessesTable";

export function FreePlayPage() {
    const allPersonaNames = usePersonaNames();
    const personaDataByName = usePersonaDataByName();

    const [unseenPersonaNames, setUnseenPersonaNames] = useState<Set<string>>(new Set(allPersonaNames));
    const [currentPersona, setCurrentPersona] = useState<PersonaData>(personaDataByName[unseenPersonaNames.keys().next().value!]);
    const [currentPersonaGuesses, setCurrentPersonaGuesses] = useState<string[]>([]);

    return (
        <>
            <DateWithDay className="self-start text-[min(7.5vw,2.5rem)] -rotate-[24deg]" />
        </>
    );
}