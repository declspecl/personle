import { cva } from "class-variance-authority";
import { cn } from "~/lib/utils";
import { SkewedContainer } from "./SkewedContainer";
import { WithTail } from "../graphics/WithTail";

const messageBoxVariants = cva(
    "",
    {
        variants: {
            palette: {
                a: ""
            }
        }
    }
);

interface MessageBoxProps {
    tailDirection: "left" | "right",
    children?: React.ReactNode,
    className?: string
}

export function MessageBox({ tailDirection, children, className }: MessageBoxProps) {
    return (
        <div className={cn(
            "flex flex-row items-end",
            { "flex-row-reverse" : tailDirection === "right" },
            className
        )}>
            <WithTail
                fromSide={tailDirection}
                className={cn(
                    "relative w-20 h-8"
                )}
                outerClassName="bg-white -z-10"
                innerClassName="bg-black z-10"
            />

            <SkewedContainer
                skewDirection={tailDirection === "left" ? "right" : "left"}
                deltaWidthRem={1}
                className={cn(
                    "relative p-1.5 bg-white z-0",
                    { "right-8" : tailDirection === "left" },
                    { "left-8" : tailDirection === "right" }
                )}
            >
                <SkewedContainer
                    skewDirection={tailDirection === "left" ? "right" : "left"}
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