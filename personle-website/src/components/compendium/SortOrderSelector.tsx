import { Button } from "@ui/Button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@ui/Select";

interface SortOrderSelectorProps {
	setSortOrder: (value: string) => void;
}

export function SortOrderSelector({ setSortOrder }: SortOrderSelectorProps) {
	return (
		<Select onValueChange={setSortOrder}>
			<Button
				role="select"
				palette="whiteText"
				className="justify-between gap-2 hover:before:bg-opacity-0 group"
				rotate={false}
				skewMagnitude="xs"
				asChild
			>
				<SelectTrigger className="w-48">
					<SelectValue placeholder="Choose sort order..." />
				</SelectTrigger>
			</Button>

			<SelectContent>
				<SelectGroup>
					<SelectItem value="ascending">Ascending</SelectItem>
					<SelectItem value="descending">Descending</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
