import React from "react";
import { Button } from "@ui/Button";
import { MessageBox } from "@ui/MessageBox";
import { PersonaData } from "@lib/server/model";
import { PersonaCombobox } from "./PersonaCombobox";
import { SkewedContainer } from "@ui/SkewedContainer";

interface MakeGuessControllerProps {
	selectedPersona: PersonaData | null;
	setSelectedPersona: React.Dispatch<React.SetStateAction<PersonaData | null>>;
	onClick?: (guess: PersonaData) => void;
	personaNames: string[];
	disabled?: boolean;
}

export function MakeGuessController({ selectedPersona, setSelectedPersona, onClick, personaNames, disabled }: MakeGuessControllerProps) {
	return (
		<div className="w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
			<MessageBox fromSide="left" className="text-white" deltaWidthRem={1}>
				<PersonaCombobox
					selectedPersona={selectedPersona}
					setSelectedPersona={setSelectedPersona}
					onSelect={setSelectedPersona}
					personaNames={personaNames}
				/>
			</MessageBox>

			<SkewedContainer skewDirection="left" deltaWidthRem={0.5} className="self-end sm:mx-0 p-1 w-fit bg-white">
				<SkewedContainer skewDirection="left" deltaWidthRem={0.5} className="w-fit bg-black">
					<Button
						size="md"
						disabled={disabled || !selectedPersona}
						rotate={false}
						skewMagnitude="none"
						palette="whiteText"
						onClick={() => {
							if (!selectedPersona) return;

							if (onClick) {
								onClick(selectedPersona);
							}

							setSelectedPersona(null);
						}}
					>
						Submit guess
					</Button>
				</SkewedContainer>
			</SkewedContainer>
		</div>
	);
}
