import { cn } from "@lib/utils"

interface MessageBoxTailProps {
    fromSide: "left" | "right",
    containerClassName?: string,
    outerTailClassName?: string,
    innerTailClassName?: string
}

export function MessageBoxTail({ fromSide, containerClassName, outerTailClassName, innerTailClassName }: MessageBoxTailProps) {
    const outerTailClipPathPolygon = "polygon(0% 25%, 35% 75%, 45% 60%, 80% 100%, 100% 80%, 100% 0%, 75% 0%, 60% 20%, 35% 0%, 32.5% 30%)";
    const innerTailClipPathPolygon = "polygon(0% 25%, 35% 75%, 40% 50%, 80% 100%, 100% 80%, 100% 0%, 75% 0%, 70% 25%, 35% 0%, 32.5% 30%)";

    return (
        <div className={cn(
            "relative w-16 h-8 bottom-2",
            "sm:w-24 sm:h-10 sm:bottom-0",
            containerClassName
        )}>
            <div
                className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white -z-10",
                    { "scale-[-1]": fromSide === "right"},
                    outerTailClassName
                )}
                style={{
                    clipPath: outerTailClipPathPolygon,
                    WebkitClipPath: outerTailClipPathPolygon
                }}
            />

            <div
                className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/5 bg-black z-10",
                    { "scale-[-1]": fromSide === "right"},
                    innerTailClassName
                )}
                style={{
                    clipPath: innerTailClipPathPolygon,
                    WebkitClipPath: innerTailClipPathPolygon
                }}
            />
        </div>
    );
}