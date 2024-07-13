import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateWithDay } from "~/components/typography/DateWithDay";
import { NewspaperText } from "~/components/typography/NewspaperText";
import { Button } from "~/components/ui/Button";
import { ComboboxDemo } from "~/components/ui/Combobox";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "~/components/ui/Command";
import { MessageBox } from "~/components/ui/MessageBox";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/Popover";
import { Skeleton } from "~/components/ui/Skeleton";
import { getGuesses } from "~/lib/backend/api";
import { cn } from "~/lib/utils";

function UserGuesses() {
    const [todayPersona, setTodayPersona] = useState<string>(null!)
    const [guesses, setGuesses] = useState<string[]>([]);

    const { isError, isLoading, data } = useSuspenseQuery({
        queryKey: ["getGuesses"],
        queryFn: getGuesses
    });

    useEffect(() => {
        if (data) {
            setTodayPersona(data.persona);
            setGuesses(data.guesses);
        }
    }, [data]);

    return (
        <div className="text-white">
            <h1>{todayPersona}</h1>

            <ul>
                {guesses.map(guess => (
                    <li key={guess}>{guess}</li>
                ))}
            </ul>
        </div>
    );
}

export function PlayPage() {
    return (
        <div className="w-full flex flex-col gap-4">
            <Link to="/">
                <NewspaperText
                    text="Personle!"
                    redLetters={["o"]}
                    element="h1"
                    palette="whiteOnTransparent"
                    className={cn(
                        "mx-auto w-fit block text-[min(12.5vw,5rem)]"
                    )}
                />
            </Link>

            <DateWithDay className="self-start text-[min(7.5vw,2.5rem)] -rotate-12" />
            
            <div className="w-full flex flex-row justify-end">
                <MessageBox fromSide="right" className="text-white">
                    <p>Guess today's Persona!</p>
                </MessageBox>
            </div>

            <MessageBox fromSide="left" className="text-white">
                <ComboboxDemo />
            </MessageBox>

            <Suspense fallback={<Skeleton deltaWidthRem={1} skewDirection="right" className="w-20 h-20" />}>
                <UserGuesses />
            </Suspense>
        </div>
    );
}