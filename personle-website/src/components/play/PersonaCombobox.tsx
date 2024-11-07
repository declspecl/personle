import { cn } from "@lib/utils";
import { Button } from "@ui/Button";
import { useMemo, useState } from "react";
import { IconContext } from "react-icons";
import { PersonaData } from "@lib/server/model";
import { LuChevronsUpDown, LuCheck } from "react-icons/lu";
import { usePersonaDataByName } from "@hooks/usePersonaDataContext";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/Popover";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@ui/Command";

interface PersonaComboboxProps {
	disabled?: boolean;
	selectedPersona: PersonaData | null;
	setSelectedPersona: (data: PersonaData) => void;
	onSelect?: (data: PersonaData) => void;
	personaNames: string[];
	setPreviewPersona: React.Dispatch<React.SetStateAction<PersonaData | null>>;
	previewPersona: PersonaData | null;
}

export function PersonaCombobox({ disabled = false, selectedPersona, setSelectedPersona, onSelect, personaNames, setPreviewPersona }: PersonaComboboxProps) {
	const personaDataByName = usePersonaDataByName();
	const [open, setOpen] = useState(false);

	const personasCommandList = useMemo(() => {
		return personaNames.map((personaName) => (
			<CommandItem
				key={personaName}
				value={personaName}
				onSelect={(currentValue) => {
					const correspondingPersonaData = personaDataByName[currentValue];

					if (!correspondingPersonaData) return;

					setSelectedPersona(correspondingPersonaData);
					setOpen(false);

					if (onSelect) {
						onSelect(correspondingPersonaData);
					}
				}}
				onMouseOver={() => {
					const correspondingPersonaData = personaDataByName[personaName];

					if (!correspondingPersonaData) return;

					setPreviewPersona(correspondingPersonaData);
				}}
				onMouseLeave={() => setPreviewPersona(null)}
			>
				<IconContext.Provider value={{ className: cn("mr-2 h-4 w-4", selectedPersona?.name === personaName ? "opacity-100" : "opacity-0") }}>
					<LuCheck />
				</IconContext.Provider>

				<span>{personaName}</span>
			</CommandItem>
		));
	}, [onSelect, selectedPersona, setSelectedPersona, personaDataByName, personaNames]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					disabled={disabled}
					role="combobox"
					palette="whiteText"
					aria-expanded={open}
					className="justify-between gap-2 hover:before:bg-opacity-0 group"
					rotate={false}
					skewMagnitude="xs"
				>
					<span>{selectedPersona ? selectedPersona.name : "Select a persona..."}</span>

					<IconContext.Provider value={{ className: "h-4 w-4 shrink-0 text-grey-light group-hover:text-grey-dark" }}>
						<LuChevronsUpDown />
					</IconContext.Provider>
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-52 sm:w-72 p-0">
				<Command>
					<CommandInput placeholder="Search personas..." />

					<CommandEmpty>No persona found.</CommandEmpty>

					<CommandList className="max-h-48 sm:max-h-80">{personasCommandList}</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
