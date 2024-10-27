import { useState } from "react";
import { MessageBox } from "@ui/MessageBox";
import { PersonaData } from "@lib/server/model";
import { DateWithDay } from "@components/typography/DateWithDay";
import { UserGuessManager } from "@components/play/UserGuessManager";
import { usePersonaDataByName, usePersonaNames } from "@hooks/usePersonaDataContext";

export function FreePlayPage() {
	const allPersonaNames = usePersonaNames();
	const personaDataByName = usePersonaDataByName();

	const [unseenPersonaNames] = useState<string[]>(allPersonaNames);
	const [correctPersona] = useState<PersonaData>(personaDataByName[unseenPersonaNames[Math.floor(Math.random() * unseenPersonaNames.length)]]);
	const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(null);

	const [guesses, setGuesses] = useState<PersonaData[]>([]);

	return (
		<>
			<DateWithDay className="self-start text-[min(7.5vw,2.5rem)] -rotate-[24deg]" />

			<div className="w-full flex flex-row justify-end">
				<div className="flex flex-col gap-4">
					<MessageBox fromSide="right" className="text-white" deltaWidthRem={1}>
						<p>Guess a randomly selected persona!</p>
					</MessageBox>

					<MessageBox fromSide="right" className="text-white" deltaWidthRem={1}>
						<p>You have unlimited guesses. Good luck!</p>
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
							alert("Correct! Go back to the home page and come back for a new persona (:skull:)");
						}, 3000);
					}
				}}
			/>
		</>
	);
}
