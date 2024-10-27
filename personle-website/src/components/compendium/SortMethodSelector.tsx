import { Button } from "@ui/Button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@ui/Select";

interface SortMethodSelectorProps {
	setSortMethod: (value: string) => void;
}

export function SortMethodSelector({ setSortMethod }: SortMethodSelectorProps) {
	return (
		<Select onValueChange={setSortMethod}>
			<Button
				role="select"
				palette="whiteText"
				className="justify-between gap-2 hover:before:bg-opacity-0 group"
				rotate={false}
				skewMagnitude="xs"
				asChild
			>
				<SelectTrigger className="w-48">
					<SelectValue placeholder="Sort by..." />
				</SelectTrigger>
			</Button>

			<SelectContent>
				<SelectGroup>
					<SelectItem value="alphabet">Alphabet</SelectItem>
					<SelectItem value="level">Level</SelectItem>
					<SelectItem value="arcana">Arcana</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
