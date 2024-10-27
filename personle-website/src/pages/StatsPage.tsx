import { NewspaperText } from "@/components/typography/NewspaperText";

export function StatsPage() {
	return (
		<div className="text-lg text-white">
			<NewspaperText
				text="Work In Progress"
				redLetters={["o", "n"]}
				palette="whiteOnTransparent"
				className="text-5xl"
			/>

			<div className="my-2" />

			<p>Come back later!</p>
		</div>
	);
}
