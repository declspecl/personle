export function YellowResultsStage() {
	return (
		<div className="text-lg text-white flex flex-col gap-2">
			<p>
				A <span className="text-yellow">yellow</span> attribute means the correct Persona PARTIALLY shares of the value you guessed.
			</p>
			<p>
				For example, if your guess has weaknesses of <span className="text-yellow">Phys, Gun</span>, it means the correct Persona is either weak to
				Phys, Gun, or potentially both.
			</p>
			<p>
				Also, if your guess has a level within 10 of the correct persona, it will be <span className="text-yellow">yellow</span>. This means that with a
				level of <span className="text-yellow">34</span>, the correct Persona's level is between 24 and 44.
			</p>
		</div>
	);
}
