import { useMemo } from "react";
import { cn } from "@lib/utils";
import { GuessesRow } from "./GuessesRow";
import { IconContext } from "react-icons";
import { PersonaData } from "@lib/server/model";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@ui/Table";

interface GuessesTableProps {
	selectedPersona: PersonaData | null;
	correctPersona: PersonaData;
	guesses: PersonaData[];
	className?: string;
}

export function GuessesTable({ selectedPersona, correctPersona, guesses, className }: GuessesTableProps) {
	const reversedGuesses = useMemo(() => [...guesses].reverse(), [guesses]);

	const isDesktop = useMediaQuery("(min-width: 64rem)");

	return (
		<>
			<Table className={cn("text-white", className)}>
				<TableHeader>
					<TableRow className="text-lg">
						<TableHead className="text-left">Persona</TableHead>
						<TableHead className="text-center">Level</TableHead>
						<TableHead className="text-center">Arcana</TableHead>
						<TableHead className="text-center">Highest Stat(s)</TableHead>
						<TableHead className="text-center">Weaknesses</TableHead>
						<TableHead className="text-center">Resistances</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{selectedPersona && (
						<GuessesRow
							key={`guess-result-row-unsubmitted-${selectedPersona.name}`}
							correctPersona={correctPersona}
							guessPersona={selectedPersona}
							isSubmitted={false}
						/>
					)}
					{reversedGuesses.map((guess) => (
						<GuessesRow key={`guess-result-row-${guess.name}`} correctPersona={correctPersona} guessPersona={guess} isSubmitted />
					))}
				</TableBody>
			</Table>

			{!isDesktop && (
				<div className="mt-2 text-lg text-white text-center w-full flex flex-row justify-center items-center gap-2">
					<IconContext.Provider value={{ className: "text-white" }}>
						<LuArrowLeft />

						<div className="flex justify-center items-center">
							<span>Scroll horizontally to see more</span>
						</div>

						<LuArrowRight />
					</IconContext.Provider>
				</div>
			)}
		</>
	);
}
