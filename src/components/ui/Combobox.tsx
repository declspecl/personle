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
    }
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
                className="w-[200px] justify-between"
                asChild
            >
                <PopoverTrigger>
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Select persona..."
                    }

                    <IconContext.Provider value={{ className: "ml-2 h-4 w-4 shrink-0 opacity-50" }}>
                        <LuChevronsUpDown />
                    </IconContext.Provider>
                </PopoverTrigger>
            </Button>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandList>
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

                                {framework.label}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}