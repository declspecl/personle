import { useState } from "react";
import { MessageBox } from "@ui/MessageBox";
import { PersonaData } from "@lib/server/model";
import { DateWithDay } from "@components/typography/DateWithDay";
import { GuessesTable } from "@components/play/table/GuessesTable";
import { MakeGuessController } from "@components/play/MakeGuessController";
import { usePersonaDataByName, usePersonaNames } from "@hooks/usePersonaDataContext";

interface UserGuessManagerProps {
	correctPersona: PersonaData;
	selectedPersona: PersonaData | null;
	setSelectedPersona: React.Dispatch<React.SetStateAction<PersonaData | null>>;
	onCorrectGuess: () => void;
}

function UserGuessManager({ correctPersona, selectedPersona, setSelectedPersona, onCorrectGuess }: UserGuessManagerProps) {
	const personaDataByName = usePersonaDataByName();
	const [guesses, setGuesses] = useState<PersonaData[]>([]);

	return (
		<div>
			<MakeGuessController
				selectedPersona={selectedPersona}
				setSelectedPersona={setSelectedPersona}
				onClick={(guess: PersonaData) => {
					setGuesses((prev) => [...prev, personaDataByName[guess.name]]);

					if (guess.name === correctPersona.name) {
						onCorrectGuess();
					}
				}}
			/>

			<GuessesTable className="my-8" guesses={guesses} correctPersona={correctPersona} selectedPersona={selectedPersona} />
		</div>
	);
}

export function FreePlayPage() {
	const allPersonaNames = usePersonaNames();
	const personaDataByName = usePersonaDataByName();

	const [unseenPersonaNames] = useState<string[]>(allPersonaNames);
	const [correctPersona] = useState<PersonaData>(personaDataByName[unseenPersonaNames[Math.floor(Math.random() * unseenPersonaNames.length)]]);
	const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(null);

	console.log(correctPersona);

	return (
		<>
			<DateWithDay className="self-start text-[min(7.5vw,2.5rem)] -rotate-[24deg]" />

			<div className="w-full flex flex-row justify-end">
				<MessageBox fromSide="right" className="text-white text-center" deltaWidthRem={1}>
					<p>
						You have unlimited attempts to guess a <br /> randomly selected persona. Good luck!
					</p>
				</MessageBox>
			</div>

			<div>
				<UserGuessManager
					correctPersona={correctPersona}
					selectedPersona={selectedPersona}
					setSelectedPersona={setSelectedPersona}
					onCorrectGuess={() => {
						setTimeout(() => {
							alert("Correct! Go back to the home page and come back for a new persona (:skull:)");
						}, 3000);
					}}
				/>
			</div>
		</>
	);
}
