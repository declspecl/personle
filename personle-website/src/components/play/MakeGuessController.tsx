import { Button } from "@ui/Button";
import { MessageBox } from "@ui/MessageBox";
import { PersonaData } from "@lib/server/model";
import { PersonaCombobox } from "./PersonaCombobox";
import { SkewedContainer } from "@ui/SkewedContainer";
import React, { useLayoutEffect, useState } from "react";
import { TutorialPopover } from "@components/tutorial/TutorialPopover";
import { hasUserSeenTutorial, setUserHasSeenTutorial } from "@/lib/tutorial";
import { GiveUpDialog } from "./GiveUpDialog";

interface MakeGuessControllerProps {
	selectedPersona: PersonaData | null;
	setSelectedPersona: React.Dispatch<React.SetStateAction<PersonaData | null>>;
	onSubmit?: (guess: PersonaData) => void;
	personaNames: string[];
	disabled?: boolean;
	isFreeplay?: boolean;
	correctPersona: PersonaData;
	resetOnGiveUp?: () => void;
	setPreviewPersona: React.Dispatch<React.SetStateAction<PersonaData | null>>;
	previewPersona: PersonaData | null;
}

export function MakeGuessController({
	selectedPersona,
	setSelectedPersona,
	onSubmit,
	personaNames,
	disabled,
	isFreeplay,
	correctPersona,
	resetOnGiveUp,
	previewPersona,
	setPreviewPersona
}: MakeGuessControllerProps) {
	const [isTutorialOpen, setIsTutorialOpen] = useState(false);
	const [isGiveUpOpen, setIsGiveUpOpen] = useState<boolean>(false);

	useLayoutEffect(() => {
		if (!hasUserSeenTutorial()) {
			setIsTutorialOpen(true);
			setUserHasSeenTutorial();
		}
	}, []);

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
						previewPersona={previewPersona}
						setPreviewPersona={setPreviewPersona}
						disabled={disabled}
						selectedPersona={selectedPersona}
						setSelectedPersona={setSelectedPersona}
						onSelect={setSelectedPersona}
						personaNames={personaNames}
					/>
				</MessageBox>
			</div>

			<div className="flex justify-end align-center flex-col">
				{isFreeplay && (
					<MessageBox fromSide="right" className="text-white mb-4" deltaWidthRem={1}>
						<Button size="md" rotate={false} skewMagnitude="xs" destructive palette="whiteText" onClick={() => setIsGiveUpOpen(true)}>
							Give up?
						</Button>
					</MessageBox>
				)}
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
			</div>

			<TutorialPopover open={isTutorialOpen} setOpen={setIsTutorialOpen} />
			{resetOnGiveUp && <GiveUpDialog resetOnGiveUp={resetOnGiveUp} correctPersona={correctPersona} open={isGiveUpOpen} setOpen={setIsGiveUpOpen} />}
		</div>
	);
}
