import { cn } from "@lib/utils";
import { useMemo } from "react";
import { GuessCell } from "./GuessCell";
import { IconContext } from "react-icons";
import { PersonaData } from "@lib/server/model";
import { TableCell, TableRow } from "@ui/Table";
import { LuArrowBigDown, LuArrowBigUp } from "react-icons/lu";
import { NewspaperText } from "@components/typography/NewspaperText";
import { EqualityRelation, getEqualityRelation, getListEqualityRelation, getNumericalEqualityRelationWithinRange } from "@lib/play";

interface GuessesRowProps {
	correctPersona: PersonaData;
	guessPersona: PersonaData;
	isSubmitted?: boolean;
}

export function GuessesRow({ correctPersona, guessPersona, isSubmitted }: GuessesRowProps) {
	const {
		levelEqualityRelation,
		arcanaEqualityRelation,
		fusionMethodEqualityRelation,
		highestStatsEqualityRelation,
		weaknessesEqualityRelation,
		resistancesEqualityRelation
	} = useMemo(
		() => ({
			levelEqualityRelation: getNumericalEqualityRelationWithinRange(correctPersona.level, guessPersona.level, 10),
			arcanaEqualityRelation: getEqualityRelation(correctPersona.arcana, guessPersona.arcana),
			fusionMethodEqualityRelation: getEqualityRelation(correctPersona.fusionMethod, guessPersona.fusionMethod),
			highestStatsEqualityRelation: getListEqualityRelation(correctPersona.highestStats, guessPersona.highestStats),
			weaknessesEqualityRelation: getListEqualityRelation(correctPersona.weaknesses, guessPersona.weaknesses),
			resistancesEqualityRelation: getListEqualityRelation(correctPersona.resistances, guessPersona.resistances)
		}),
		[correctPersona, guessPersona]
	);

	const initialDelay = 0.25;
	const delayMultiplier = 0.65;
	const animationDelays = [0, 1, 2, 3, 4, 5].map(delayMultiple => initialDelay + (delayMultiplier * delayMultiple));

	return (
		<TableRow className="text-lg">
			<TableCell>
				<NewspaperText hover={false} randomRedLetter={isSubmitted} className="text-3xl text-left" palette="whiteOnBlack" text={guessPersona.name} />
			</TableCell>
			<GuessCell isSubmitted={isSubmitted} equalityRelation={levelEqualityRelation} animationDelay={animationDelays[0]}>
				<div className="w-auto h-full flex flex-col items-center justify-center">
					{(!isSubmitted || (isSubmitted && guessPersona.level >= correctPersona.level)) && <span>{guessPersona.level}</span>}

					<IconContext.Provider
						value={{ className: cn(levelEqualityRelation === EqualityRelation.Disjoint ? "text-white fill-white" : "text-black fill-black") }}
					>
						{isSubmitted && guessPersona.level > correctPersona.level && <LuArrowBigDown />}
						{isSubmitted && guessPersona.level < correctPersona.level && <LuArrowBigUp />}
					</IconContext.Provider>

					{isSubmitted && guessPersona.level < correctPersona.level && <span>{guessPersona.level}</span>}
				</div>
			</GuessCell>
			<GuessCell isSubmitted={isSubmitted} equalityRelation={arcanaEqualityRelation} animationDelay={animationDelays[1]}>
				{guessPersona.arcana}
			</GuessCell>
			<GuessCell isSubmitted={isSubmitted} equalityRelation={fusionMethodEqualityRelation} animationDelay={animationDelays[2]}>
				{guessPersona.fusionMethod}
			</GuessCell>
			<GuessCell isSubmitted={isSubmitted} equalityRelation={highestStatsEqualityRelation} animationDelay={animationDelays[3]}>
				<ul>
					{guessPersona.highestStats.map((stat, i) => (
						<li key={`highest-stat-${stat}@${i}`}>{stat}</li>
					))}
				</ul>
			</GuessCell>
			<GuessCell isSubmitted={isSubmitted} equalityRelation={weaknessesEqualityRelation} animationDelay={animationDelays[4]}>
				<ul>
					{guessPersona.weaknesses.length > 0 ? (
						guessPersona.weaknesses.map((weakness, i) => <li key={`weakness-${weakness}@${i}`}>{weakness}</li>)
					) : (
						<li>None</li>
					)}
				</ul>
			</GuessCell>
			<GuessCell isSubmitted={isSubmitted} equalityRelation={resistancesEqualityRelation} animationDelay={animationDelays[5]}>
				<ul>
					{guessPersona.resistances.length > 0 ? (
						guessPersona.resistances.map((resistance, i) => <li key={`resistance-${resistance}@${i}`}>{resistance}</li>)
					) : (
						<li>None</li>
					)}
				</ul>
			</GuessCell>
		</TableRow>
	);
}
