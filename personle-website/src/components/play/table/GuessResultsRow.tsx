import { cn } from "~/lib/utils";
import { PersonaData } from "~/lib/server/model";
import { TableCell, TableRow } from "../../ui/Table";
import { NewspaperText } from "../../typography/NewspaperText";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";

interface GuessResultsRow {
    todayPersona: PersonaData;
    guess: PersonaData;
    isSubmitted?: boolean;
}

export function GuessResultsRow({ todayPersona, guess, isSubmitted }: GuessResultsRow) {
    const { name, level, arcana, fusionMethod, highestStats, weaknesses, resistances } = guess;

    if (isSubmitted) {
        return (
            <TableRow className="text-lg">
                <TableCell>
                    <NewspaperText hover={false} palette="whiteOnBlack" className="text-3xl" randomRedLetter text={name} />
                </TableCell>
                <SingleGuessResultsCell lhs={todayPersona.level} rhs={guess.level}>
                    {level}

                    {guess.level > todayPersona.level ? (
                        <LuArrowDown />
                    ) : (
                        <LuArrowUp />
                    )}
                </SingleGuessResultsCell>
                <SingleGuessResultsCell lhs={todayPersona.arcana} rhs={guess.arcana}>{arcana}</SingleGuessResultsCell>
                <SingleGuessResultsCell lhs={todayPersona.fusionMethod} rhs={guess.fusionMethod}>{fusionMethod}</SingleGuessResultsCell>
                <IterableGuessResultsCell lhs={todayPersona.highestStats} rhs={guess.highestStats}>
                    <ul>
                        {highestStats.map((stat, i) => (
                            <li key={`highest-stat-${stat}@${i}`}>{stat}</li>
                        ))}
                    </ul>
                </IterableGuessResultsCell>
                <IterableGuessResultsCell lhs={todayPersona.weaknesses} rhs={guess.weaknesses}>
                    <ul>
                        {weaknesses.length > 0 ? weaknesses.map((weakness, i) => (
                            <li key={`weakness-${weakness}@${i}`}>{weakness}</li>
                        )) : (
                            <li>None</li>
                        )}
                    </ul>
                </IterableGuessResultsCell>
                <IterableGuessResultsCell lhs={todayPersona.resistances} rhs={guess.resistances}>
                    <ul>
                        {resistances.length > 0 ? resistances.map((resistance, i) => (
                            <li key={`resistance-${resistance}@${i}`}>{resistance}</li>
                        )) : (
                            <li>None</li>
                        )}
                    </ul>
                </IterableGuessResultsCell>
            </TableRow>
        );
    }
    else {
        return (
            <TableRow className="text-lg">
                <TableCell>
                    <NewspaperText hover={false} palette="whiteOnBlack" className="text-3xl" randomRedLetter text={name} />
                </TableCell>
                <TableCell>{level}</TableCell>
                <TableCell>{arcana}</TableCell>
                <TableCell>{fusionMethod}</TableCell>
                <TableCell>
                    <ul>
                        {highestStats.map((stat, i) => (
                            <li key={`highest-stat-${stat}@${i}`}>{stat}</li>
                        ))}
                    </ul>
                </TableCell>
                <TableCell>
                    <ul>
                        {weaknesses.length > 0 ? weaknesses.map((weakness, i) => (
                            <li key={`weakness-${weakness}@${i}`}>{weakness}</li>
                        )) : (
                            <li>None</li>
                        )}
                    </ul>
                </TableCell>
                <TableCell>
                    <ul>
                        {resistances.length > 0 ? resistances.map((resistance, i) => (
                            <li key={`resistance-${resistance}@${i}`}>{resistance}</li>
                        )) : (
                            <li>None</li>
                        )}
                    </ul>
                </TableCell>
            </TableRow>
        );
    }
}

enum IterableEquality {
    Equal = "Equal",
    Overlapping = "Overlapping",
    Disjoint = "Disjoint"
}

interface SingleGuessResultsCellProps<T> {
    lhs: T;
    rhs: T;
    children: React.ReactNode;
}

export function SingleGuessResultsCell<T>({ lhs, rhs, children }: SingleGuessResultsCellProps<T>) {
    const equality = lhs === rhs ? IterableEquality.Equal : IterableEquality.Disjoint;

    return (
        <GuessResultsCell equality={equality}>
            {children}
        </GuessResultsCell>
    );
}

interface IterableGuessResultsCellProps<T, I extends T[]> {
    lhs: I;
    rhs: I;
    children: React.ReactNode;
}

export function IterableGuessResultsCell<T, I extends T[]>({ lhs, rhs, children }: IterableGuessResultsCellProps<T, I>) {
    const iterableEquality = listRelation(lhs, rhs);

    return (
        <GuessResultsCell equality={iterableEquality}>
            {children}
        </GuessResultsCell>
    );
}

interface GuessResultsCellProps {
    equality: IterableEquality;
    children: React.ReactNode;
}

function GuessResultsCell({ equality, children }: GuessResultsCellProps) {
    return (
        <TableCell className={cn(
            equality === IterableEquality.Equal && "bg-blue-light text-black",
            equality === IterableEquality.Overlapping && "bg-yellow text-black",
            equality === IterableEquality.Disjoint && "bg-red"
        )}>
            {children}
        </TableCell>
    );
}

function areEqual<T>(list1: T[], list2: T[]): boolean {
    if (list1.length !== list2.length) {
        return false;
    }

    const sorted1 = [...list1].sort();
    const sorted2 = [...list2].sort();
    
    for (let i = 0; i < sorted1.length; i++) {
        if (sorted1[i] !== sorted2[i]) {
            return false;
        }
    }

    return true;
}

// Function to check if two lists are disjoint
function areDisjoint<T>(list1: T[], list2: T[]): boolean {
    const set1 = new Set(list1);

    for (const item of list2) {
        if (set1.has(item)) {
            return false;
        }
    }

    return true;
}

// Main function to determine relationship between two lists
function listRelation<T>(list1: T[], list2: T[]): IterableEquality {
    if (areEqual(list1, list2)) {
        return IterableEquality.Equal;
    }
    else if (areDisjoint(list1, list2)) {
        return IterableEquality.Disjoint;
    }
    else {
        return IterableEquality.Overlapping;
    }
}