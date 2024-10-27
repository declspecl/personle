import { useState } from "react";
import { Button } from "@ui/Button";
import { EndStage } from "./EndStage";
import { WelcomeStage } from "./WelcomeStage";
import { MakeGuessStage } from "./MakeGuessStage";
import { RedResultsStage } from "./RedResultsStage";
import { BlueResultsStage } from "./BlueResultsStage";
import { SkewedContainer } from "@ui/SkewedContainer";
import { YellowResultsStage } from "./YellowResultsStage";
import { DialogDescription } from "@radix-ui/react-dialog";
import { NewspaperText } from "@components/typography/NewspaperText";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@ui/Dialog";
import { getFirstTutorialStage, getNextTutorialStage, getPreviousTutorialStage, TutorialStage } from "@lib/tutorial";

interface TutorialPopoverProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export function TutorialPopover({ open, setOpen }: TutorialPopoverProps) {
	const [stage, setStage] = useState<TutorialStage>(getFirstTutorialStage());

	return (
		<Dialog
			open={open}
			onOpenChange={(value) => {
				setOpen(value);
				setStage(getFirstTutorialStage());
			}}
		>
			<DialogContent className="text-white">
				<DialogHeader>
					<DialogTitle>
						<NewspaperText hover={false} text="Tutorial" redLetters={["T", "t"]} palette="whiteOnTransparent" className="text-5xl" />
					</DialogTitle>

					<DialogDescription className="text-xl">{stage}</DialogDescription>
				</DialogHeader>

				<div className="my-4">
					{stage === TutorialStage.Welcome ? (
						<WelcomeStage />
					) : stage === TutorialStage.MakeGuess ? (
						<MakeGuessStage />
					) : stage === TutorialStage.RedResult ? (
						<RedResultsStage />
					) : stage === TutorialStage.YellowResult ? (
						<YellowResultsStage />
					) : stage === TutorialStage.BlueResult ? (
						<BlueResultsStage />
					) : (
						<EndStage />
					)}
				</div>

				<DialogFooter className="gap-2">
					{getPreviousTutorialStage(stage) !== null && (
						<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="p-1 w-fit bg-white">
							<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="w-fit bg-black">
								<Button
									size="md"
									rotate={false}
									skewMagnitude="none"
									palette="whiteText"
									onClick={() => setStage(getPreviousTutorialStage(stage)!)}
								>
									Back
								</Button>
							</SkewedContainer>
						</SkewedContainer>
					)}

					{getNextTutorialStage(stage) !== null ? (
						<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="p-1 w-fit bg-white">
							<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="w-fit bg-black">
								<Button
									size="md"
									rotate={false}
									skewMagnitude="none"
									palette="whiteText"
									onClick={() => setStage(getNextTutorialStage(stage)!)}
								>
									Next
								</Button>
							</SkewedContainer>
						</SkewedContainer>
					) : (
						<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="p-1 w-fit bg-white">
							<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="w-fit bg-black">
								<Button
									size="md"
									rotate={false}
									skewMagnitude="none"
									palette="whiteText"
									onClick={() => {
										setStage(getFirstTutorialStage());
										setOpen(false);
									}}
								>
									Close
								</Button>
							</SkewedContainer>
						</SkewedContainer>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
