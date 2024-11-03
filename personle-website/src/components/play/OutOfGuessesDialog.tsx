import React from "react";
import { NewspaperText } from "@components/typography/NewspaperText";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@ui/Dialog";

interface OutOfGuessesDialogProps {
	correctPersona: string;
	open: boolean;
	setOpen: (open: boolean) => void;
	children: React.ReactNode;
}

export function OutOfGuessesDialog({ correctPersona, open, setOpen, children }: OutOfGuessesDialogProps) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="text-white">
				<DialogHeader>
					<DialogTitle>
						<NewspaperText hover={false} text="NiCe Try!" redLetters={["i", "T"]} palette="whiteOnBlack" className="text-5xl" />
					</DialogTitle>

					<DialogDescription className="text-xl">
						You're out of guesses! The correct persona today was <span className="font-bold">{correctPersona}</span>.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="mt-4 justify-center">{children}</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
