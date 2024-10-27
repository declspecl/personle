export function MakeGuessStage() {
	return (
		<div className="text-lg text-white flex flex-col gap-2">
			<p>Each guess you make will reveal some information about the correct Persona based on these attributes:</p>

			<ul className="list-disc list-inside">
				<li>Level</li>
				<li>Arcana</li>
				<li>Highest Stat(s if tied)</li>
				<li>Weaknesses</li>
				<li>Resistances (does not include null or drain)</li>
			</ul>

			<p>
				Each attribute will be marked with a color that reveals how close it is to the correct Persona: <span className="text-red">red</span>,{" "}
				<span className="text-yellow">yellow</span>, and <span className="text-blue-light">blue</span>
			</p>
		</div>
	);
}
