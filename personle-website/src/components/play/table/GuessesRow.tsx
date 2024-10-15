import { useMemo } from "react";
import { GuessCell } from "./GuessCell";
import { PersonaData } from "~/lib/server/model";
import { TableCell, TableRow } from "../../ui/Table";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";
import { NewspaperText } from "../../typography/NewspaperText";
import { getEqualityRelation, getListEqualityRelation } from "~/lib/play";

interface GuessesRowProps {
    correctPersona: PersonaData;
    guessPersona: PersonaData;
    isSubmitted?: boolean;
}

export function GuessesRow({ correctPersona, guessPersona, isSubmitted }: GuessesRowProps) {
    const levelEqualityRelation = useMemo(
        () => getEqualityRelation(correctPersona.level, guessPersona.level),
        [correctPersona.level, guessPersona.level]
    );
    const arcanaEqualityRelation = useMemo(
        () => getEqualityRelation(correctPersona.arcana, guessPersona.arcana),
        [correctPersona.arcana, guessPersona.arcana]
    );
    const fusionMethodEqualityRelation = useMemo(
        () => getEqualityRelation(correctPersona.fusionMethod, guessPersona.fusionMethod),
        [correctPersona.fusionMethod, guessPersona.fusionMethod]
    );
    const highestStatsEqualityRelation = useMemo(
        () => getListEqualityRelation(correctPersona.highestStats, guessPersona.highestStats),
        [correctPersona.highestStats, guessPersona.highestStats]
    );
    const weaknessesEqualityRelation = useMemo(
        () => getListEqualityRelation(correctPersona.weaknesses, guessPersona.weaknesses),
        [correctPersona.weaknesses, guessPersona.weaknesses]
    );
    const resistancesEqualityRelation = useMemo(
        () => getListEqualityRelation(correctPersona.resistances, guessPersona.resistances),
        [correctPersona.resistances, guessPersona.resistances]
    );

    return (
        <TableRow className="text-lg">
            <TableCell>
                <NewspaperText
                    hover={false}
                    randomRedLetter
                    className="text-3xl"
                    palette="whiteOnBlack"
                    text={guessPersona.name}
                />
            </TableCell>
            <GuessCell isSubmitted={isSubmitted} equalityRelation={levelEqualityRelation}>
                {guessPersona.level}

                {isSubmitted && (
                    <>
                        {guessPersona.level > correctPersona.level ? (
                            <LuArrowDown />
                        ) : (
                            <LuArrowUp />
                        )}
                    </>
                )}
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
