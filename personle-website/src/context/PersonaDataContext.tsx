import { PersonaData } from "~/lib/server/model";
import { createContext, useContext } from "react";

const PersonaNamesContext = createContext<string[] | undefined>(undefined);
const PersonaDataByNameContext = createContext<Record<string, PersonaData> | undefined>(undefined);

export function usePersonaNames() {
    const context = useContext(PersonaNamesContext);

    if (context === undefined) {
        throw new Error("usePersonaNames must be used within a PersonaNamesProvider");
    }

    return context;
}

export function usePersonaDataByName() {
    const context = useContext(PersonaDataByNameContext);

    if (context === undefined) {
        throw new Error("usePersonaDataByName must be used within a PersonaDataByNameProvider");
    }

    return context;
}

interface PersonaNamesProviderProps {
    personaNames: string[];
    children: React.ReactNode;
}

export function PersonaNamesProvider({ children, personaNames }: PersonaNamesProviderProps) {
    return (
        <PersonaNamesContext.Provider value={personaNames}>
            {children}
        </PersonaNamesContext.Provider>
    );
}

interface PersonaDataByNameProviderProps {
    personaDataByName: Record<string, PersonaData>;
    children: React.ReactNode;
}

export function PersonaDataByNameProvider({ children, personaDataByName }: PersonaDataByNameProviderProps) {
    return (
        <PersonaDataByNameContext.Provider value={personaDataByName}>
            {children}
        </PersonaDataByNameContext.Provider>
    );
}