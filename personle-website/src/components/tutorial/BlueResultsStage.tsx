export function BlueResultsStage() {
	return (
		<div className="text-lg text-white flex flex-col gap-2">
			<p>
				A <span className="text-blue-light">blue</span> attribute means you guessed the correct Person's attribute exactly right! Great job!
			</p>
			<p>
				For example, if your guess has weaknesses of <span className="text-blue-light">Phys, Gun</span>, it means the correct Persona is exactly weak to
				Phys and Gun, nothing more, nothing less.
			</p>
			<p>
				To win the game, you must guess <span className="text-blue-light">all attributes</span> correctly!
			</p>
		</div>
	);
}
