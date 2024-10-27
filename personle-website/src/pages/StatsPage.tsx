import { TutorialPopover } from "@/components/tutorial/TutorialPopover";
import { NewspaperText } from "@/components/typography/NewspaperText";
import { useState } from "react";

export function StatsPage() {
	const [showTutorial, setShowTutorial] = useState(false);

	return (
		<div className="text-lg text-white">
			<NewspaperText text="Work In Progress" redLetters={["o", "n"]} palette="whiteOnTransparent" className="text-5xl" />

			<div className="my-2" />

			<p>Come back later!</p>

			<button onClick={() => setShowTutorial(true)}>Show Tutorial</button>

			<TutorialPopover open={showTutorial} setOpen={setShowTutorial} />
		</div>
	);
}
