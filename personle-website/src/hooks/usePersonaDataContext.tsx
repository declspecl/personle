import { useContext } from "react";
import { PersonaDataByNameContext, PersonaNamesContext } from "@context/PersonaDataContext";

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
