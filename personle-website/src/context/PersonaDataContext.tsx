import { createContext } from "react";
import { PersonaData } from "@lib/server/model";

export const PersonaNamesContext = createContext<string[] | undefined>(undefined);
export const PersonaDataByNameContext = createContext<Record<string, PersonaData> | undefined>(undefined);

interface PersonaNamesProviderProps {
	personaNames: string[];
	children: React.ReactNode;
}

export function PersonaNamesProvider({ children, personaNames }: PersonaNamesProviderProps) {
	return <PersonaNamesContext.Provider value={personaNames}>{children}</PersonaNamesContext.Provider>;
}

interface PersonaDataByNameProviderProps {
	personaDataByName: Record<string, PersonaData>;
	children: React.ReactNode;
}

export function PersonaDataByNameProvider({ children, personaDataByName }: PersonaDataByNameProviderProps) {
	return <PersonaDataByNameContext.Provider value={personaDataByName}>{children}</PersonaDataByNameContext.Provider>;
}
