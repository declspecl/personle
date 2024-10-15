import { useMemo } from "react";
import { GuessCell } from "./GuessCell";
import { IconContext } from "react-icons";
import { PersonaData } from "~/lib/server/model";
import { TableCell, TableRow } from "../../ui/Table";
import { LuArrowBigDown, LuArrowBigUp } from "react-icons/lu";
import { NewspaperText } from "../../typography/NewspaperText";
import { getEqualityRelation, getListEqualityRelation } from "~/lib/play";

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
    } = useMemo(() => ({
        levelEqualityRelation: getEqualityRelation(correctPersona.level, guessPersona.level),
        arcanaEqualityRelation: getEqualityRelation(correctPersona.arcana, guessPersona.arcana),
        fusionMethodEqualityRelation: getEqualityRelation(correctPersona.fusionMethod, guessPersona.fusionMethod),
        highestStatsEqualityRelation: getListEqualityRelation(correctPersona.highestStats, guessPersona.highestStats),
        weaknessesEqualityRelation: getListEqualityRelation(correctPersona.weaknesses, guessPersona.weaknesses),
        resistancesEqualityRelation: getListEqualityRelation(correctPersona.resistances, guessPersona.resistances),
    }), [correctPersona, guessPersona]);

    return (
        <TableRow className="text-lg">
            <TableCell>
                <NewspaperText
                    hover={false}
                    randomRedLetter={isSubmitted}
                    className="text-3xl"
                    palette="whiteOnBlack"
                    text={guessPersona.name}
                />
            </TableCell>
            <GuessCell isSubmitted={isSubmitted} equalityRelation={levelEqualityRelation} className="relative">
                <IconContext.Provider value={{ className: "absolute top-0 left-0 w-full h-full text-red-dark fill-red-dark" }}>
                    {isSubmitted && guessPersona.level > correctPersona.level && (
                        <LuArrowBigDown />
                    )}
                    {isSubmitted && guessPersona.level < correctPersona.level && (
                        <LuArrowBigUp />
                    )}
                </IconContext.Provider>

                <span>{guessPersona.level}</span>
            </GuessCell>
            <GuessCell isSubmitted={isSubmitted} equalityRelation={arcanaEqualityRelation}>
                {guessPersona.arcana}
            </GuessCell>
            <GuessCell isSubmitted={isSubmitted} equalityRelation={fusionMethodEqualityRelation}>
                {guessPersona.fusionMethod}
            </GuessCell>
            <GuessCell isSubmitted={isSubmitted} equalityRelation={highestStatsEqualityRelation}>
                <ul>
                    {guessPersona.highestStats.map((stat, i) => (
                        <li key={`highest-stat-${stat}@${i}`}>{stat}</li>
                    ))}
                </ul>
            </GuessCell>
            <GuessCell isSubmitted={isSubmitted} equalityRelation={weaknessesEqualityRelation}>
                <ul>
                    {guessPersona.weaknesses.length > 0 ? guessPersona.weaknesses.map((weakness, i) => (
                        <li key={`weakness-${weakness}@${i}`}>{weakness}</li>
                    )) : (
                        <li>None</li>
                    )}
                </ul>
            </GuessCell>
            <GuessCell isSubmitted={isSubmitted} equalityRelation={resistancesEqualityRelation}>
                <ul>
                    {guessPersona.resistances.length > 0 ? guessPersona.resistances.map((resistance, i) => (
                        <li key={`resistance-${resistance}@${i}`}>{resistance}</li>
                    )) : (
                        <li>None</li>
                    )}
                </ul>
            </GuessCell>
        </TableRow>
    );
}
