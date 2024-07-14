import React from "react";
import { cn } from "~/lib/utils";
import { IconContext } from "react-icons";
import { Button } from "@/components/ui/Button";
import { LuChevronsUpDown, LuCheck } from "react-icons/lu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/Command";

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
    {
        value: "astro2",
        label: "Astro2",
    },
    {
        value: "astro3",
        label: "Astro3",
    },
    {
        value: "astro4",
        label: "Astro4",
    },
    {
        value: "astro5",
        label: "Astro4",
    },
    {
        value: "astro6",
        label: "Astro4",
    },
    {
        value: "astro7",
        label: "Astro4",
    },
]

export function ComboboxDemo() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <Button
                palette="whiteText"
                role="combobox"
                aria-expanded={open}
                className="justify-between gap-2 hover:before:bg-opacity-0 group"
                rotate={false}
                skewMagnitude="xs"
                asChild
            >
                <PopoverTrigger>
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Select a persona..."
                    }

                    <IconContext.Provider value={{ className: "h-4 w-4 shrink-0 text-grey-light group-hover:text-grey-dark" }}>
                        <LuChevronsUpDown />
                    </IconContext.Provider>
                </PopoverTrigger>
            </Button>
            <PopoverContent className="w-52 p-0">
                <Command>
                    <CommandInput placeholder="Search personas..." />
                    <CommandEmpty>No persona found.</CommandEmpty>
                    <CommandList className="max-h-40">
                        {frameworks.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                <IconContext.Provider value={{ className: cn("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0" )}}>
                                    <LuCheck />
                                </IconContext.Provider>

                                <span>{framework.label}</span>
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}