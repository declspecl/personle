import React from "react";
import { cn } from "~/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

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
            palette: {
                whiteOnBlack: "text-white",
                blackOnWhite: "text-black",
                whiteOnTransparent: "bg-transparent text-white",
                blackOnTransparent: "bg-transparent text-black"
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
            },
            makeRed: {
                true: "text-red",
                false: ""
            }
        },
        defaultVariants: {
            palette: "whiteOnBlack",
            size: "5xl",
            makeRed: false
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

export function NewspaperLetter({ letter, font, palette, size, makeRed, className, ...props }: NewspaperLetterProps) {
    return (
        <span
            className={cn(
                NewspaperLetterVariants({ font, palette, size, makeRed }),
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
    "w-fit block tracking-tight",
    {
        variants: {
            palette: {
                whiteOnBlack: "bg-black text-white",
                blackOnWhite: "bg-white text-black",
                whiteOnTransparent: "bg-transparent text-white",
                blackOnTransparent: "bg-transparent text-black"
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
            palette: "whiteOnBlack",
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

export function NewspaperText({ text, palette, size, className, ...props }: NewspaperTextProps) {
    const MIN_BOTTOM_OFFSET = 0.025, MAX_BOTTOM_OFFSET = 0.125;

    const shouldHaveRed = (palette === "blackOnWhite" || palette === "whiteOnBlack") && Math.random() < 0.25;
    const redCharIndex = shouldHaveRed
        ? Math.floor(Math.random() * text.replace(/\s+/g, "").length)
        : -1;

    return (
        <p
            className={cn(
                NewspaperTextVariants({ palette, size }),
                className,
            )}
            {...props}
        >
            {text.split("").map((char, i) => {
                const bottomOffset = Math.random() * (MAX_BOTTOM_OFFSET - MIN_BOTTOM_OFFSET) + MIN_BOTTOM_OFFSET
                
                return (
                    <NewspaperLetter
                        key={`${text}-char-${i}-${char}`}
                        font={getCorrespondingFontForLetter(char)}
                        palette={palette}
                        size={size}
                        makeRed={i === redCharIndex}
                        style={{
                            "bottom": `${bottomOffset}em`
                        }}
                        letter={char}
                    />
                )
            })}
        </p>
    );
}