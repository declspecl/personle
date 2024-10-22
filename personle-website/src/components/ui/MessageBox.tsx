import { cn } from "@lib/utils";
import { SkewedContainer } from "@ui/SkewedContainer";
import { MessageBoxTail } from "@components/graphics/MessageBoxTail";

interface MessageBoxProps {
    fromSide: "left" | "right",
    deltaWidthRem: number,
    children?: React.ReactNode,
    className?: string
}

export function MessageBox({ fromSide, deltaWidthRem, children, className }: MessageBoxProps) {
    const oppositeSide = fromSide === "left" ? "right" : "left";

    return (
        <div className={cn(
            "max-w-full flex flex-row items-end",
            { "flex-row-reverse" : fromSide === "right" },
            className
        )}>
            <MessageBoxTail fromSide={fromSide} />

            <SkewedContainer
                skewDirection={oppositeSide}
                deltaWidthRem={deltaWidthRem}
                className={cn(
                    "relative p-1.5 bg-white",
                    { "right-5 sm:right-8" : fromSide === "left" },
                    { "left-5 sm:left-8" : fromSide === "right" }
                )}
            >
                <SkewedContainer
                    skewDirection={oppositeSide}
                    deltaWidthRem={deltaWidthRem}
                    className={cn(
                        "relative p-2 px-4 bg-black"
                    )}
                >
                    <div className="z-20">
                        {children}
                    </div>
                </SkewedContainer>
            </SkewedContainer>
        </div>
    );
}