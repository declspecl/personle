import { PersonaData } from "@lib/server/model";
import { NewspaperText } from "@components/typography/NewspaperText";

interface PersonaInformationProps {
	persona: PersonaData;
}

export function PersonaInformation({ persona }: PersonaInformationProps) {
	return (
		<div className="col-auto row-auto text-lg">
			<NewspaperText hover={false} randomRedLetter text={persona.name} palette="whiteOnBlack" className="text-2xl sm:text-3xl md:text-4xl" />

			<ul>
				<li>Name: {persona.name}</li>
				<li>Level: {persona.level}</li>
				<li>Arcana: {persona.arcana}</li>
				<li>Fusion Method: {persona.fusionMethod}</li>
				<li>Highest Stats: {persona.highestStats.join(", ")}</li>
				<li>Weaknesses: {persona.weaknesses.length ? persona.weaknesses.join(", ") : "None"}</li>
				<li>Resistances: {persona.resistances.length ? persona.resistances.join(", ") : "None"}</li>
			</ul>
		</div>
	);
}
