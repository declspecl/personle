import { useState } from "react";
import { IconContext } from "react-icons";
import { MessageBox } from "@ui/MessageBox";
import { PersonaData } from "@lib/server/model";
import { LuLoaderCircle } from "react-icons/lu";
import { MAX_DAILY_GUESSES } from "@data/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DateWithDay } from "@components/typography/DateWithDay";
import { getDailyGuesses, GetDailyGuessesResponse, makeDailyGuess } from "@lib/server/api";
import { usePersonaDataByName } from "@hooks/usePersonaDataContext";
import { UserGuessManager } from "@components/play/UserGuessManager";
import { CorrectGuessDialog } from "@/components/play/CorrectGuessDialog";
import { SkewedContainer } from "@/components/ui/SkewedContainer";
import { Button } from "@/components/ui/Button";
import { OutOfGuessesDialog } from "@/components/play/OutOfGuessesDialog";

interface DailyPlayGuessManagerProps {
	initialGuesses: PersonaData[];
	correctPersona: PersonaData;
	selectedPersona: PersonaData | null;
	previewPersona: PersonaData | null;
	setSelectedPersona: React.Dispatch<React.SetStateAction<PersonaData | null>>;
	setPreviewPersona: React.Dispatch<React.SetStateAction<PersonaData | null>>;
}

function DailyPlayGuessManager({
	initialGuesses,
	correctPersona,
	selectedPersona,
	setSelectedPersona,
	previewPersona,
	setPreviewPersona
}: DailyPlayGuessManagerProps) {
	const queryClient = useQueryClient();
	const personaDataByName = usePersonaDataByName();

	const [guesses, setGuesses] = useState<PersonaData[]>(initialGuesses);
	const [isCorrectGuessDialogOpen, setIsCorrectGuessDialogOpen] = useState(false);
	const [isOutOfGuessesDialogOpen, setIsOutOfGuessesDialogOpen] = useState(false);

	return (
		<>
			<UserGuessManager
				disabled={guesses.length >= MAX_DAILY_GUESSES || guesses.includes(correctPersona)}
				guesses={guesses}
				correctPersona={correctPersona}
				selectedPersona={selectedPersona}
				setSelectedPersona={setSelectedPersona}
				previewPersona={previewPersona}
				setPreviewPersona={setPreviewPersona}
				onSubmitGuess={async (guess: PersonaData) => {
					if (guesses.includes(personaDataByName[guess.name])) return;

					const res = await makeDailyGuess(guess.name);
					if (res.status !== 200 && res.status !== 204) return;

					setGuesses((prev) => {
						const newGuesses = [...prev, personaDataByName[guess.name]];

						queryClient.setQueryData(
							["getDailyGuesses"],
							(data: GetDailyGuessesResponse): GetDailyGuessesResponse => ({
								todayPersona: data.todayPersona,
								guesses: [...data.guesses, guess.name]
							})
						);

						if (guess.name === correctPersona.name) {
							setTimeout(() => setIsCorrectGuessDialogOpen(true), 3500);
						} else if (newGuesses.length >= MAX_DAILY_GUESSES) {
							setTimeout(() => setIsOutOfGuessesDialogOpen(true), 3500);
						}

						return newGuesses;
					});
				}}
			/>

			<CorrectGuessDialog open={isCorrectGuessDialogOpen} setOpen={setIsCorrectGuessDialogOpen} numberOfGuesses={guesses.length} isDailyPlay={true}>
				<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="p-1 w-fit bg-white">
					<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="w-fit bg-black">
						<Button size="md" rotate={false} skewMagnitude="none" palette="whiteText" onClick={() => setIsCorrectGuessDialogOpen(false)}>
							Close
						</Button>
					</SkewedContainer>
				</SkewedContainer>
			</CorrectGuessDialog>

			<OutOfGuessesDialog open={isOutOfGuessesDialogOpen} setOpen={setIsOutOfGuessesDialogOpen} correctPersona={correctPersona.name}>
				<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="p-1 w-fit bg-white">
					<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="w-fit bg-black">
						<Button size="md" rotate={false} skewMagnitude="none" palette="whiteText" onClick={() => setIsOutOfGuessesDialogOpen(false)}>
							Close
						</Button>
					</SkewedContainer>
				</SkewedContainer>
			</OutOfGuessesDialog>
		</>
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
	const [previewPersona, setPreviewPersona] = useState<PersonaData | null>(null);

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
					<LuLoaderCircle />
				</IconContext.Provider>
			) : error ? (
				<div className="text-white">
					<p>ERROR: "{error.message}"</p>
					<p>Please refresh the page and try again.</p>
				</div>
			) : (
				data && (
					<DailyPlayGuessManager
						setPreviewPersona={setPreviewPersona}
						previewPersona={previewPersona}
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
