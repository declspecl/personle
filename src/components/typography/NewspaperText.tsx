import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import React from "react";
import { cn } from "~/lib/utils";

const NewspaperLetterVariants = cva(
    "relative inline-block border-x-[0.125rem]",
    {
        variants: {
            variant: {
                whiteOnBlack: "bg-black border-black text-white",
                blackOnWhite: "bg-white border-white text-black"
            },
            font: {
                times: "font-times font-medium",
                cooper: "font-cooper font-normal",
                quilon: "font-quilon font-extralight"
            },
            size: {
                "5xl": "text-5xl"
            }
        },
        defaultVariants: {
            variant: "whiteOnBlack",
            size: "5xl"
        }
    }
);

interface NewspaperLetterProps
extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof NewspaperLetterVariants>
{}

export function NewspaperLetter({ className, variant, font, ...props }: NewspaperLetterProps) {
    return (
        <span
            className={clsx(
                NewspaperLetterVariants({ variant, font }),
                className
            )}
            {...props}
        />
    );

}

interface NewspaperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    text: string
}

export function NewspaperText({ text, className, ...props }: NewspaperTextProps) {
    const MIN_Y_OFFSET = -5, MAX_Y_OFFSET = 5;

    return (
        <p className={cn("tracking-[-0.1rem]", className)} {...props}>
            {text.split("").map(char => {
                let yOffset = Math.random() * (MAX_Y_OFFSET - MIN_Y_OFFSET) + MIN_Y_OFFSET;

                // make lowercase letters have less variation in y offset
                if (char.toLocaleLowerCase() === char) {
                    yOffset *= 0.5;
                }

                const isWhiteOnBlack = Math.random() < 0.95;
                const fontChoiceNumber = Math.floor(Math.random() * 3);
                
                return (
                    <NewspaperLetter
                        variant={isWhiteOnBlack ? "whiteOnBlack" : "blackOnWhite"}
                        font={
                            fontChoiceNumber === 0
                            ? "times"
                            : fontChoiceNumber === 1
                            ? "cooper"
                            : "quilon"
                        }
                        className="relative"
                        style={{
                            top: `${yOffset}px`
                        }}
                    >
                        {char}
                    </NewspaperLetter>
                )
            })}
        </p>
    );
}