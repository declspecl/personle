import { Button } from "@ui/Button";
import React, { useState } from "react";
import { MessageBox } from "@ui/MessageBox";
import { PersonaData } from "@lib/server/model";
import { PersonaCombobox } from "./PersonaCombobox";
import { SkewedContainer } from "@ui/SkewedContainer";
import { TutorialPopover } from "@components/tutorial/TutorialPopover";

interface MakeGuessControllerProps {
	selectedPersona: PersonaData | null;
	setSelectedPersona: React.Dispatch<React.SetStateAction<PersonaData | null>>;
	onSubmit?: (guess: PersonaData) => void;
	personaNames: string[];
	disabled?: boolean;
}

export function MakeGuessController({ selectedPersona, setSelectedPersona, onSubmit, personaNames, disabled }: MakeGuessControllerProps) {
	const [isTutorialOpen, setIsTutorialOpen] = useState(false);

	return (
		<div className="w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
			<div className="flex flex-col gap-2">
				<MessageBox fromSide="left" className="text-white" deltaWidthRem={1}>
					<Button size="md" rotate={false} skewMagnitude="xs" palette="whiteText" onClick={() => setIsTutorialOpen(true)}>
						View the tutorial
					</Button>
				</MessageBox>

				<MessageBox fromSide="left" className="text-white" deltaWidthRem={1}>
					<PersonaCombobox
						disabled={disabled}
						selectedPersona={selectedPersona}
						setSelectedPersona={setSelectedPersona}
						onSelect={setSelectedPersona}
						personaNames={personaNames}
					/>
				</MessageBox>
			</div>

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

							if (onSubmit) {
								onSubmit(selectedPersona);
							}

							setSelectedPersona(null);
						}}
					>
						Submit guess
					</Button>
				</SkewedContainer>
			</SkewedContainer>

			<TutorialPopover open={isTutorialOpen} setOpen={setIsTutorialOpen} />
		</div>
	);
}
