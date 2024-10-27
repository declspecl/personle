import { Button } from "@ui/Button";
import { useMemo, useState } from "react";
import { usePersonaDataByName } from "@hooks/usePersonaDataContext";
import { PersonaInformation } from "@components/compendium/PersonaInformation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@ui/Select";

export function CompendiumPage() {
	const personaDataByName = usePersonaDataByName();

	const [sortMethod, setSortMethod] = useState("alphabet");
	const [sortOrder, setSortOrder] = useState("ascending");

	const sortedPersonas = useMemo(() => {
		return Object.values(personaDataByName).sort((a, b) => {
			if (sortMethod === "alphabet") {
				if (sortOrder === "ascending") {
					return a.name.localeCompare(b.name);
				} else {
					return b.name.localeCompare(a.name);
				}
			} else if (sortMethod === "level") {
				if (sortOrder === "ascending") {
					return a.level - b.level;
				} else {
					return b.level - a.level;
				}
			} else if (sortMethod === "arcana") {
				if (sortOrder === "ascending") {
					return a.arcana.localeCompare(b.arcana);
				} else {
					return b.arcana.localeCompare(a.arcana);
				}
			}

			return 0;
		});
	}, [personaDataByName, sortMethod, sortOrder]);

	return (
		<>
			<div className="flex flex-row gap-4">
				<Select onValueChange={setSortMethod}>
					<Button
						role="select"
						palette="whiteText"
						className="justify-between gap-2 hover:before:bg-opacity-0 group"
						rotate={false}
						skewMagnitude="xs"
						asChild
					>
						<SelectTrigger className="w-48">
							<SelectValue placeholder="Sort by..." />
						</SelectTrigger>
					</Button>

					<SelectContent>
						<SelectGroup>
							<SelectItem value="alphabet">Alphabet</SelectItem>
							<SelectItem value="level">Level</SelectItem>
							<SelectItem value="arcana">Arcana</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>

				<Select onValueChange={setSortOrder}>
					<Button
						role="select"
						palette="whiteText"
						className="justify-between gap-2 hover:before:bg-opacity-0 group"
						rotate={false}
						skewMagnitude="xs"
						asChild
					>
						<SelectTrigger className="w-48">
							<SelectValue placeholder="Choose sort order..." />
						</SelectTrigger>
					</Button>

					<SelectContent>
						<SelectGroup>
							<SelectItem value="ascending">Ascending</SelectItem>
							<SelectItem value="descending">Descending</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div className="text-white grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3">
				{sortedPersonas.map((persona) => (
					<PersonaInformation persona={persona} key={`persona-information-${persona.name}`} />
				))}
			</div>
		</>
	);
}
