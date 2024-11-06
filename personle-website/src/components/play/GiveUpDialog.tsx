import React, { useState } from "react";
import { NewspaperText } from "@components/typography/NewspaperText";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@ui/Dialog";
import { SkewedContainer } from "../ui/SkewedContainer";
import { Button } from "../ui/Button";
import { PersonaData } from "@/lib/server/model";

interface GiveUpDialogProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	correctPersona: PersonaData;
	resetOnGiveUp: () => void;
}

export function GiveUpDialog({ correctPersona, open, setOpen, resetOnGiveUp }: GiveUpDialogProps) {
	const [confirmedGiveUp, setConfirmedGiveUp] = useState<boolean>(false);

	return (
		<Dialog open={open} onOpenChange={(value) => setOpen(value)}>
			<DialogContent className="text-white">
				<DialogHeader>
					<DialogTitle>
						<NewspaperText
							hover={false}
							text={confirmedGiveUp ? "NiCe Try" : "GiVe Up?"}
							redLetters={(confirmedGiveUp ? "iT" : "iU").split("")}
							palette="whiteOnBlack"
							className="text-5xl"
						/>
					</DialogTitle>

					<DialogDescription className="text-xl">
						<div className="mb-4">
							{!confirmedGiveUp ? (
								<div className="flex flex-col">
									<span className="mb-2">Are you sure you want to give up?</span>
									<span className="font-bold">This will discard all your guesses and generate a new persona!</span>
								</div>
							) : (
								<div>
									The correct persona was <span className="font-bold">{correctPersona.name}</span>.
								</div>
							)}
						</div>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="p-1 w-fit bg-white">
						<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="w-fit bg-black">
							<Button
								size="md"
								rotate={false}
								skewMagnitude="none"
								palette="whiteText"
								onClick={() => {
									setOpen(false);
									setConfirmedGiveUp(false);
								}}
							>
								Close
							</Button>
						</SkewedContainer>
					</SkewedContainer>
					{!confirmedGiveUp && (
						<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="p-1 w-fit bg-white">
							<SkewedContainer skewDirection="right" deltaWidthRem={0.5} className="w-fit bg-black">
								<Button
									size="md"
									rotate={false}
									skewMagnitude="none"
									palette="whiteText"
									destructive
									onClick={() => {
										setConfirmedGiveUp(true);
										resetOnGiveUp();
									}}
								>
									Give up
								</Button>
							</SkewedContainer>
						</SkewedContainer>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
