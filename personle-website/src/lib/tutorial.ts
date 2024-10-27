export enum TutorialStage {
	Welcome = "Welcome to Personle!",
	MakeGuess = "Making a Guess",
	RedResult = "Red Results",
	YellowResult = "Yellow Results",
	BlueResult = "Blue Results",
	End = "End"
}

export function getFirstTutorialStage() {
	return TutorialStage.Welcome;
}

export function getPreviousTutorialStage(stage: TutorialStage): TutorialStage | null {
	switch (stage) {
		case TutorialStage.Welcome:
			return null;

		case TutorialStage.MakeGuess:
			return TutorialStage.Welcome;

		case TutorialStage.RedResult:
			return TutorialStage.MakeGuess;

		case TutorialStage.YellowResult:
			return TutorialStage.RedResult;

		case TutorialStage.BlueResult:
			return TutorialStage.YellowResult;

		case TutorialStage.End:
			return TutorialStage.BlueResult;

		default:
			return null;
	}
}

export function getNextTutorialStage(stage: TutorialStage): TutorialStage | null {
	switch (stage) {
		case TutorialStage.Welcome:
			return TutorialStage.MakeGuess;

		case TutorialStage.MakeGuess:
			return TutorialStage.RedResult;

		case TutorialStage.RedResult:
			return TutorialStage.YellowResult;

		case TutorialStage.YellowResult:
			return TutorialStage.BlueResult;

		case TutorialStage.BlueResult:
			return TutorialStage.End;

		case TutorialStage.End:
			return null;

		default:
			return null;
	}
}

export function getLastTutorialStage() {
	return TutorialStage.End;
}
