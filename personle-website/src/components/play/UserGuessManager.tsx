import { useMemo } from "react";
import { PersonaData } from "@lib/server/model";
import { usePersonaNames } from "@hooks/usePersonaDataContext";
import { GuessesTable } from "@components/play/table/GuessesTable";
import { MakeGuessController } from "@components/play/MakeGuessController";

interface UserGuessManagerProps {
	disabled?: boolean;
	guesses: PersonaData[];
	correctPersona: PersonaData;
	selectedPersona: PersonaData | null;
	setSelectedPersona: React.Dispatch<React.SetStateAction<PersonaData | null>>;
	onSubmitGuess: (guess: PersonaData) => Promise<void> | void;
	isFreeplay?: boolean;
	resetOnGiveUp?: () => void;
}

export function UserGuessManager({
	disabled = false,
	guesses,
	correctPersona,
	selectedPersona,
	setSelectedPersona,
	onSubmitGuess,
	isFreeplay,
	resetOnGiveUp
}: UserGuessManagerProps) {
	const allPersonaNames = usePersonaNames();

	const possiblePersonaNames = useMemo(() => {
		return allPersonaNames.filter((name) => !guesses.find((guess) => guess.name === name));
	}, [allPersonaNames, guesses]);

	return (
		<div>
			<MakeGuessController
				isFreeplay={isFreeplay}
				disabled={disabled}
				personaNames={possiblePersonaNames}
				selectedPersona={selectedPersona}
				setSelectedPersona={setSelectedPersona}
				onSubmit={onSubmitGuess}
				correctPersona={correctPersona}
				resetOnGiveUp={resetOnGiveUp}
			/>

			<GuessesTable className="my-8" guesses={guesses} correctPersona={correctPersona} selectedPersona={selectedPersona} />
		</div>
	);
}
