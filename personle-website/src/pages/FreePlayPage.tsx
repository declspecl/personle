import { useState } from "react";
import { MessageBox } from "@ui/MessageBox";
import { Button } from "@components/ui/Button";
import { PersonaData } from "@lib/server/model";
import { DateWithDay } from "@components/typography/DateWithDay";
import { SkewedContainer } from "@components/ui/SkewedContainer";
import { UserGuessManager } from "@components/play/UserGuessManager";
import { CorrectGuessDialog } from "@components/play/CorrectGuessDialog";
import { usePersonaDataByName, usePersonaNames } from "@hooks/usePersonaDataContext";

export function FreePlayPage() {
	const allPersonaNames = usePersonaNames();
	const personaDataByName = usePersonaDataByName();

	const [unseenPersonaNames] = useState<string[]>(allPersonaNames);
	const [correctPersona, setCorrectPersona] = useState<PersonaData>(
		personaDataByName[unseenPersonaNames[Math.floor(Math.random() * unseenPersonaNames.length)]]
	);
	const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(null);

	const [guesses, setGuesses] = useState<PersonaData[]>([]);

	const [isCorrectGuessDialogOpen, setIsCorrectGuessDialogOpen] = useState(false);

	return (
		<>
			<DateWithDay className="self-start text-[min(7.5vw,2.5rem)] -rotate-[24deg]" />

			<div className="w-full flex flex-row justify-end">
				<div className="flex flex-col gap-4">
					<MessageBox fromSide="right" className="text-white" deltaWidthRem={1}>
						<p>You have unlimited attempts to guess a randomly selected Persona. Good luck!</p>
					</MessageBox>
				</div>
			</div>

			<UserGuessManager
				disabled={guesses.includes(correctPersona)}
				guesses={guesses}
				correctPersona={correctPersona}
				selectedPersona={selectedPersona}
				setSelectedPersona={setSelectedPersona}
				onSubmitGuess={(guess: PersonaData) => {
					if (guesses.includes(personaDataByName[guess.name])) return;

					setGuesses((prev) => [...prev, personaDataByName[guess.name]]);

					if (guess.name === correctPersona.name) {
						setTimeout(() => {
							setIsCorrectGuessDialogOpen(true);
						}, 3500);
					}
				}}
			/>

			<CorrectGuessDialog open={isCorrectGuessDialogOpen} setOpen={setIsCorrectGuessDialogOpen} numberOfGuesses={guesses.length} isDailyPlay={false}>
				<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="p-1 w-fit bg-white">
					<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="w-fit bg-black">
						<Button
							size="md"
							rotate={false}
							skewMagnitude="none"
							palette="whiteText"
							onClick={() => {
								setGuesses([]);
								setCorrectPersona(personaDataByName[unseenPersonaNames[Math.floor(Math.random() * unseenPersonaNames.length)]]);

								setIsCorrectGuessDialogOpen(false);
							}}
						>
							Next Persona
						</Button>
					</SkewedContainer>
				</SkewedContainer>
			</CorrectGuessDialog>
		</>
	);
}
