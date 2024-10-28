import React from "react";
import { NewspaperText } from "@components/typography/NewspaperText";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@ui/Dialog";

interface CorrectGuessDialogProps {
	isDailyPlay: boolean;
	numberOfGuesses: number;
	open: boolean;
	setOpen: (open: boolean) => void;
	children: React.ReactNode;
}

export function CorrectGuessDialog({ isDailyPlay, numberOfGuesses, open, setOpen, children }: CorrectGuessDialogProps) {
	const guessDependentMessage =
		numberOfGuesses === 1
			? "Wow, first try! What are the odds? I can tell you actually, its about 0.48%!"
			: numberOfGuesses <= 4
				? "Great job! You're a natural!"
				: numberOfGuesses <= 7
					? "Nice guesses!"
					: numberOfGuesses === 8
						? "Phew, that was a close call!"
						: "That was a tough one!";

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="text-white">
				<DialogHeader>
					<DialogTitle>
						<NewspaperText hover={false} text="That's CorreCt!" redLetters={["h", "C"]} palette="whiteOnBlack" className="text-5xl" />
					</DialogTitle>

					<DialogDescription className="text-xl">
						{guessDependentMessage}
						{isDailyPlay ? " See you again tomorrow?" : " Want to play again?"}
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="mt-4 justify-center">{children}</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
