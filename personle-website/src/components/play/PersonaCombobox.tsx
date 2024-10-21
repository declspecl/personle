import { cn } from "@lib/utils";
import { useMemo, useState } from "react";
import { IconContext } from "react-icons";
import { Button } from "@ui/Button";
import { LuChevronsUpDown, LuCheck } from "react-icons/lu";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/Popover";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@ui/Command";
import { PersonaData } from "@lib/server/model";
import { usePersonaDataByName, usePersonaNames } from "@context/PersonaDataContext";

interface PersonaComboboxProps {
    selectedPersona: PersonaData | null,
    setSelectedPersona: (data: PersonaData) => void,
    onSelect?: (data: PersonaData) => void
}

export function PersonaCombobox({ selectedPersona, setSelectedPersona, onSelect }: PersonaComboboxProps) {
    const personaNames = usePersonaNames();
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
            >
                <IconContext.Provider value={{ className: cn("mr-2 h-4 w-4", selectedPersona?.name === personaName ? "opacity-100" : "opacity-0" )}}>
                    <LuCheck />
                </IconContext.Provider>

                <span>{personaName}</span>
            </CommandItem>
        ))
    }, [onSelect, selectedPersona, setSelectedPersona]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
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

                    <CommandList className="max-h-48 sm:max-h-80">
                        {personasCommandList}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}