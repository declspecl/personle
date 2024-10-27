import { useMemo, useState } from "react";
import { usePersonaDataByName } from "@hooks/usePersonaDataContext";
import { SortOrderSelector } from "@components/compendium/SortOrderSelector";
import { PersonaInformation } from "@components/compendium/PersonaInformation";
import { SortMethodSelector } from "@components/compendium/SortMethodSelector";

export function CompendiumPage() {
	const personaDataByName = usePersonaDataByName();

	const [sortMethod, setSortMethod] = useState("alphabet");
	const [sortOrder, setSortOrder] = useState("ascending");

	const sortedPersonas = useMemo(() => {
		return Object.values(personaDataByName).sort((a, b) => {
			if (sortMethod === "alphabet") {
				return sortOrder === "ascending" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
			} else if (sortMethod === "level") {
				return sortOrder === "ascending" ? a.level - b.level : b.level - a.level;
			} else if (sortMethod === "arcana") {
				return sortOrder === "ascending" ? a.arcana.localeCompare(b.arcana) : b.arcana.localeCompare(a.arcana);
			} else if (sortMethod === "weaknessCount") {
				return sortOrder === "ascending" ? a.weaknesses.length - b.weaknesses.length : b.weaknesses.length - a.weaknesses.length;
			} else if (sortMethod === "resistanceCount") {
				return sortOrder === "ascending" ? a.resistances.length - b.resistances.length : b.resistances.length - a.resistances.length;
			}

			return 0;
		});
	}, [personaDataByName, sortMethod, sortOrder]);

	return (
		<>
			<div className="flex flex-col gap-4 sm:flex-row">
				<SortMethodSelector setSortMethod={setSortMethod} />
				<SortOrderSelector setSortOrder={setSortOrder} />
			</div>

			<div className="text-white grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3">
				{sortedPersonas.map((persona) => (
					<PersonaInformation persona={persona} key={`persona-information-${persona.name}`} />
				))}
			</div>
		</>
	);
}
