import { useState } from "react";
import { IconContext } from "react-icons";
import { LuLoader2 } from "react-icons/lu";
import { MessageBox } from "@ui/MessageBox";
import { PersonaData } from "@lib/server/model";
import { MAX_DAILY_GUESSES } from "@data/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DateWithDay } from "@components/typography/DateWithDay";
import { getDailyGuesses, makeDailyGuess } from "@lib/server/api";
import { usePersonaDataByName } from "@hooks/usePersonaDataContext";
import { UserGuessManager } from "@components/play/UserGuessManager";

interface DailyPlayGuessManagerProps {
	initialGuesses: PersonaData[];
	correctPersona: PersonaData;
	selectedPersona: PersonaData | null;
	setSelectedPersona: React.Dispatch<React.SetStateAction<PersonaData | null>>;
}

function DailyPlayGuessManager({ initialGuesses, correctPersona, selectedPersona, setSelectedPersona }: DailyPlayGuessManagerProps) {
	const queryClient = useQueryClient();
	const personaDataByName = usePersonaDataByName();

	const [guesses, setGuesses] = useState<PersonaData[]>(initialGuesses);

	return (
		<UserGuessManager
			disabled={guesses.length >= MAX_DAILY_GUESSES || guesses.includes(correctPersona)}
			guesses={guesses}
			correctPersona={correctPersona}
			selectedPersona={selectedPersona}
			setSelectedPersona={setSelectedPersona}
			onSubmitGuess={async (guess: PersonaData) => {
				if (guesses.includes(personaDataByName[guess.name])) return;

				const res = await makeDailyGuess(guess.name);
				if (res.status !== 200 && res.status !== 204) return;

				setGuesses((prev) => [...prev, personaDataByName[guess.name]]);

				queryClient.invalidateQueries({
					queryKey: ["getDailyGuesses"]
				});
			}}
		/>
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
						<p>You have 8 attempts to guess today's Persona. Good luck!</p>
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
					<DailyPlayGuessManager
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
