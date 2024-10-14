import { PersonaData } from "~/lib/server/model";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../ui/Table";
import { GuessResultsRow } from "./GuessResultsRow";
import { cn } from "~/lib/utils";
import { useMemo } from "react";

interface GuessesTableProps {
    selectedPersona: PersonaData | null;
    todayPersona: PersonaData;
    guesses: PersonaData[];
    className?: string;
}

export function GuessesTable({ selectedPersona, todayPersona, guesses, className }: GuessesTableProps) {
    const reversedGuesses = useMemo(() => [...guesses].reverse(), [guesses]);

    return (
        <Table className={cn("text-white", className)}>
            <TableHeader>
                <TableRow className="text-lg font-medium">
                    <TableHead className="text-left">Persona</TableHead>
                    <TableHead className="text-center">Level</TableHead>
                    <TableHead className="text-center">Arcana</TableHead>
                    <TableHead className="text-center">Fusion Method</TableHead>
                    <TableHead className="text-center">Highest Stat(s)</TableHead>
                    <TableHead className="text-center">Weaknesses</TableHead>
                    <TableHead className="text-center">Resistances</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {selectedPersona && (
                    <GuessResultsRow key={`guess-result-row-${selectedPersona}@selected`} todayPersona={todayPersona} guess={selectedPersona} isSubmitted={false} />
                )}
                {reversedGuesses.map((guess, i) => (
                    <GuessResultsRow key={`guess-result-row-${guess}@${i}`} todayPersona={todayPersona} guess={guess} isSubmitted />
                ))}
            </TableBody>
        </Table>
    );
}