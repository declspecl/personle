import { usePersonaDataByName } from "~/context/PersonaDataContext";

export function CompendiumPage() {
    const personaDataByName = usePersonaDataByName();

    return (
        <ul className="text-white">
            {Object.values(personaDataByName).map(persona => (
                <li key={`persona-${persona.name}`}>{persona.name}</li>
            ))}
        </ul>
    );
}