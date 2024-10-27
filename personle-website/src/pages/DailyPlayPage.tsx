import { IconContext } from "react-icons";
import { LuLoader2 } from "react-icons/lu";
import { MessageBox } from "@ui/MessageBox";
import { PersonaData } from "@lib/server/model";
import React, { useMemo, useState } from "react";
import { MAX_DAILY_GUESSES } from "@data/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DateWithDay } from "@components/typography/DateWithDay";
import { getDailyGuesses, makeDailyGuess } from "@lib/server/api";
import { GuessesTable } from "@components/play/table/GuessesTable";
import { MakeGuessController } from "@components/play/MakeGuessController";
import { usePersonaDataByName, usePersonaNames } from "@hooks/usePersonaDataContext";

interface UserGuessManagerProps {
	correctPersona: PersonaData;
	initialGuesses: PersonaData[];
	selectedPersona: PersonaData | null;
	setSelectedPersona: React.Dispatch<React.SetStateAction<PersonaData | null>>;
}

function UserGuessManager({ correctPersona, initialGuesses, selectedPersona, setSelectedPersona }: UserGuessManagerProps) {
	const queryClient = useQueryClient();
	const allPersonaNames = usePersonaNames();
	const personaDataByName = usePersonaDataByName();

	const possiblePersonaNames = useMemo(() => {
		return allPersonaNames.filter((name) => !initialGuesses.find((guess) => guess.name === name));
	}, [allPersonaNames, initialGuesses]);

	const [guesses, setGuesses] = useState<PersonaData[]>(initialGuesses);

	return (
		<div>
			<MakeGuessController
				disabled={guesses.length >= MAX_DAILY_GUESSES}
			 	personaNames={possiblePersonaNames}
				selectedPersona={selectedPersona}
				setSelectedPersona={setSelectedPersona}
				onClick={async (guess: PersonaData) => {
					if (guesses.includes(personaDataByName[guess.name])) return;

					const res = await makeDailyGuess(guess.name);
					if (res.status !== 200 && res.status !== 204) return;

					setGuesses(prev => [...prev, personaDataByName[guess.name]]);

					queryClient.invalidateQueries({
						queryKey: ["getDailyGuesses"]
					});
				}}
			/>

			<GuessesTable className="my-8" guesses={Array.from(guesses)} correctPersona={correctPersona} selectedPersona={selectedPersona} />
		</div>
	);
}

export function DailyPlayPage() {
	const personaDataByName = usePersonaDataByName();
	const { isPending, error, data } = useQuery({
		queryKey: ["getDailyGuesses"],
		queryFn: getDailyGuesses,
		staleTime: Infinity
	});
	const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(null);

	return (
		<>
			<DateWithDay className="self-start text-[min(7.5vw,2.5rem)] -rotate-[24deg]" />

			<div className="w-full flex flex-row justify-end">
				<div className="flex flex-col gap-4">
					<MessageBox fromSide="right" className="text-white" deltaWidthRem={1}>
						<p>Guess today's Persona!</p>
					</MessageBox>

					<MessageBox fromSide="right" className="text-white" deltaWidthRem={1}>
						<p>You have 8 total guesses. Good luck!</p>
					</MessageBox>
				</div>
			</div>

			{isPending ? (
				<IconContext.Provider value={{ size: "2em", className: "text-white animate-spin" }}>
					<LuLoader2 />
				</IconContext.Provider>
			) : error ? (
				<div className="text-white">
					<p>ERROR: "{error.message}"</p>
					<p>Please refresh the page and try again.</p>
				</div>
			) : (
				data && (
					<UserGuessManager
						correctPersona={personaDataByName[data.todayPersona]}
						initialGuesses={data.guesses.map((guess) => personaDataByName[guess])}
						selectedPersona={selectedPersona}
						setSelectedPersona={setSelectedPersona}
					/>
				)
			)}
		</>
	);
}
