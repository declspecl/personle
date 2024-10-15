import { useMemo } from "react";
import { cn } from "~/lib/utils";
import { GuessesRow } from "./GuessesRow";
import { PersonaData } from "~/lib/server/model";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../ui/Table";

interface GuessesTableProps {
    selectedPersona: PersonaData | null;
    correctPersona: PersonaData;
    guesses: PersonaData[];
    className?: string;
}

export function GuessesTable({ selectedPersona, correctPersona, guesses, className }: GuessesTableProps) {
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
                    <GuessesRow correctPersona={correctPersona} guessPersona={selectedPersona} isSubmitted={false} />
                )}
                {reversedGuesses.map((guess, i) => (
                    <GuessesRow key={`guess-result-row-${guess}@${i}`} correctPersona={correctPersona} guessPersona={guess} isSubmitted />
                ))}
            </TableBody>
        </Table>
    );
}