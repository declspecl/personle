import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@ui/Select";

interface SortMethodSelectorProps {
	setSortMethod: (value: string) => void;
}

export function SortMethodSelector({ setSortMethod }: SortMethodSelectorProps) {
	return (
		<Select onValueChange={setSortMethod} defaultValue="alphabet">
			<SelectTrigger className="w-48 text-white">
				<SelectValue placeholder="Sort by..." />
			</SelectTrigger>

			<SelectContent>
				<SelectGroup>
					<SelectItem value="alphabet">Alphabet</SelectItem>
					<SelectItem value="level">Level</SelectItem>
					<SelectItem value="arcana">Arcana</SelectItem>
					<SelectItem value="weaknessCount">Weaknesses Count</SelectItem>
					<SelectItem value="resistanceCount">Resistances Count</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
