export function RedResultsStage() {
	return (
		<div className="text-lg text-white flex flex-col gap-2">
			<p>
				A <span className="text-red">red</span> attribute means the correct Persona does not share the value you guessed at all.
			</p>
			<p>
				For example, if your guess has an arcana of <span className="text-red">Chariot</span>, it means the correct Persona is not of the Chariot
				arcana.
			</p>
			<p>
				Also, if your guess has weaknesses of <span className="text-red">Phys, Gun</span>, it means the correct Persona is neither weak to Phys nor Gun.
			</p>
		</div>
	);
}
