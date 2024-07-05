import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "~/lib/utils";

const NewspaperLetterVariants = cva(
    "relative",
    {
        variants: {
            font: {
                cooper: "font-cooper",
                times: "font-times font-bold",
                expose: "font-expose",
                earwig: "font-earwig"
            },
            size: {
                "9xl": "text-9xl",
                "8xl": "text-8xl",
                "7xl": "text-7xl",
                "6xl": "text-6xl",
                "5xl": "text-5xl",
                "4xl": "text-4xl",
                "3xl": "text-3xl",
                "2xl": "text-2xl",
                xl: "text-xl",
                lg: "text-lg",
                base: "text-base",
                sm: "text-sm",
                xs: "text-xs"
            }
        },
        defaultVariants: {
            size: "5xl"
        }
    }
);

interface NewspaperLetterProps
extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof NewspaperLetterVariants>
{
    letter: string
}

export function NewspaperLetter({ letter, font, size, className, ...props }: NewspaperLetterProps) {
    return (
        <span
            className={cn(
                NewspaperLetterVariants({ font, size }),
                className
            )}
            {...props}
        >
            {letter}
        </span>
    );

}

function getCorrespondingFontForLetter(letter: string): "times" | "cooper" | "earwig" | "expose" {
    switch (letter) {
        case "A":
        case "I":
        case "L":
        case "M":
        case "W":
        case "X":
        case "a":
        case "j":
        case "p":
        case "y":
            return "times";

        case "C":
        case "F":
        case "J":
        case "N":
        case "P":
        case "R":
        case "T":
        case "V":
        case "Z":
        case "b":
        case "c":
        case "e":
        case "i":
        case "k":
        case "m":
        case "o":
        case "q":
        case "u":
        case "x":
            return "earwig";
        
        case "B":
        case "E":
        case "G":
        case "H":
        case "O":
        case "Q":
        case "S":
        case "U":
        case "d":
        case "f":
        case "g":
        case "l":
        case "r":
        case "s":
        case "w":
        case "z":
            return "expose";

        case "D":
        case "K":
        case "Y":
        case "h":
        case "n":
        case "t":
        case "v":
            return "cooper";

        default:
            return "times";
    }
}

const NewspaperTextVariants = cva(
    "tracking-tight",
    {
        variants: {
            size: {
                "9xl": "text-9xl",
                "8xl": "text-8xl",
                "7xl": "text-7xl",
                "6xl": "text-6xl",
                "5xl": "text-5xl",
                "4xl": "text-4xl",
                "3xl": "text-3xl",
                "2xl": "text-2xl",
                xl: "text-xl",
                lg: "text-lg",
                base: "text-base",
                sm: "text-sm",
                xs: "text-xs"
            }
        },
        defaultVariants: {
            size: "2xl"
        }
    }
)

interface NewspaperTextProps
extends
    React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof NewspaperTextVariants>
{
    text: string
}

export function NewspaperText({ text, size, className, ...props }: NewspaperTextProps) {
    const MIN_Y_OFFSET = -0.1, MAX_Y_OFFSET = 0.075;

    return (
        <p
            className={cn(
                NewspaperTextVariants({ size }),
                className,
            )}
            {...props}
        >
            {text.split("").map(char => {
                const yOffset = Math.random() * (MAX_Y_OFFSET - MIN_Y_OFFSET) + MIN_Y_OFFSET;
                
                return (
                    <NewspaperLetter
                        font={getCorrespondingFontForLetter(char)}
                        size={size}
                        style={{
                            top: `${yOffset}em`
                        }}
                        letter={char}
                    />
                )
            })}
        </p>
    );
}