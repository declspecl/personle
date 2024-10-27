import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@ui/Select";

interface SortOrderSelectorProps {
	setSortOrder: (value: string) => void;
}

export function SortOrderSelector({ setSortOrder }: SortOrderSelectorProps) {
	return (
		<Select onValueChange={setSortOrder} defaultValue="ascending">
			<SelectTrigger className="w-48">
				<SelectValue placeholder="Choose sort order..." />
			</SelectTrigger>

			<SelectContent>
				<SelectGroup>
					<SelectItem value="ascending">Ascending</SelectItem>
					<SelectItem value="descending">Descending</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
