import { cn } from "~/lib/utils";
import { useMemo, useState } from "react";
import { IconContext } from "react-icons";
import { Button } from "@/components/ui/Button";
import { LuChevronsUpDown, LuCheck } from "react-icons/lu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/Command";
import { PersonaData } from "~/lib/server/model";
import { usePersonaDataByName, usePersonaNames } from "~/context/PersonaDataContext";

interface PersonaComboboxProps {
    selectedPersonaData: PersonaData | null,
    setSelectedPersonaData: (data: PersonaData) => void,
    onSelect?: (data: PersonaData) => void
}

export function PersonaCombobox({ selectedPersonaData, setSelectedPersonaData, onSelect }: PersonaComboboxProps) {
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

                    setSelectedPersonaData(correspondingPersonaData);
                    setOpen(false);

                    if (onSelect) {
                        onSelect(correspondingPersonaData);
                    }
                }}
            >
                <IconContext.Provider value={{ className: cn("mr-2 h-4 w-4", selectedPersonaData?.name === personaName ? "opacity-100" : "opacity-0" )}}>
                    <LuCheck />
                </IconContext.Provider>

                <span>{personaName}</span>
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
                    <span>{selectedPersonaData ? selectedPersonaData.name : "Select a persona..."}</span>

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