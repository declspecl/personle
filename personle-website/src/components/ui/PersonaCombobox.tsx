import { cn } from "~/lib/utils";
import { useMemo, useState } from "react";
import { IconContext } from "react-icons";
import { personas } from "~/data/persona";
import { Button } from "@/components/ui/Button";
import { LuChevronsUpDown, LuCheck } from "react-icons/lu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/Command";
import { PersonaData } from "~/lib/backend/model";

interface PersonaComboboxProps {
    selectedPersonaData: PersonaData | null,
    setSelectedPersonaData: (data: PersonaData) => void,
    onSelect?: (data: PersonaData) => void
}

export function PersonaCombobox({ selectedPersonaData, setSelectedPersonaData, onSelect }: PersonaComboboxProps) {
    const [open, setOpen] = useState(false);

    const personasCommandList = useMemo(() => {
        return personas.map((persona) => (
            <CommandItem
                key={persona.name}
                value={persona.name}
                onSelect={(currentValue) => {
                    const correspondingPersonaData = personas.find((persona) => persona.name === currentValue);

                    if (!correspondingPersonaData) return;

                    setSelectedPersonaData(correspondingPersonaData);
                    setOpen(false);

                    if (onSelect) {
                        onSelect(persona);
                    }
                }}
            >
                <IconContext.Provider value={{ className: cn("mr-2 h-4 w-4", selectedPersonaData?.name === persona.name ? "opacity-100" : "opacity-0" )}}>
                    <LuCheck />
                </IconContext.Provider>

                <span>{persona.name}</span>
            </CommandItem>
        ))
    }, [onSelect, selectedPersonaData, setSelectedPersonaData]);

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
                    <span>{selectedPersonaData ? personas.find((persona) => persona.name === selectedPersonaData.name)?.name : "Select a persona..."}</span>

                    <IconContext.Provider value={{ className: "h-4 w-4 shrink-0 text-grey-light group-hover:text-grey-dark" }}>
                        <LuChevronsUpDown />
                    </IconContext.Provider>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-52 p-0">
                <Command>
                    <CommandInput placeholder="Search personas..." />

                    <CommandEmpty>No persona found.</CommandEmpty>

                    <CommandList className="max-h-48">
                        {personasCommandList}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}