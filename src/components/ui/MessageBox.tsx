import { cn } from "~/lib/utils";
import { SkewedContainer } from "./SkewedContainer";
import { MessageBoxTail } from "../graphics/MessageBoxTail";

interface MessageBoxProps {
    fromSide: "left" | "right",
    children?: React.ReactNode,
    className?: string
}

export function MessageBox({ fromSide, children, className }: MessageBoxProps) {
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
                deltaWidthRem={1}
                className={cn(
                    "relative p-1.5 bg-white z-0",
                    { "right-5 sm:right-8" : fromSide === "left" },
                    { "left-5 sm:left-8" : fromSide === "right" }
                )}
            >
                <SkewedContainer
                    skewDirection={oppositeSide}
                    deltaWidthRem={1}
                    className={cn(
                        "relative p-2 px-4 bg-black z-0"
                    )}
                >
                    {children}
                </SkewedContainer>
            </SkewedContainer>
        </div>
    );
}