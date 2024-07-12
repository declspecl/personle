import { cn } from "~/lib/utils"

interface WithTailProps {
    fromSide: "left" | "right",
    className?: string,
    outerClassName?: string,
    innerClassName?: string
}

export function WithTail({ fromSide, className, outerClassName, innerClassName }: WithTailProps) {
    const outerTailClipPathPolygon = "polygon(0% 25%, 35% 75%, 45% 60%, 80% 100%, 100% 80%, 100% 0%, 75% 0%, 60% 20%, 35% 0%, 32.5% 30%)";
    const innerTailClipPathPolygon = "polygon(0% 25%, 35% 75%, 40% 50%, 80% 100%, 100% 80%, 100% 0%, 75% 0%, 70% 25%, 35% 0%, 32.5% 30%)";

    return (
        <div className={cn("relative", className)}>
            <div
                className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white",
                    { "scale-[-1]": fromSide === "right"},
                    outerClassName
                )}
                style={{
                    clipPath: outerTailClipPathPolygon,
                    WebkitClipPath: outerTailClipPathPolygon
                }}
            />

            <div
                className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/5 bg-white",
                    { "scale-[-1]": fromSide === "right"},
                    innerClassName
                )}
                style={{
                    clipPath: innerTailClipPathPolygon,
                    WebkitClipPath: innerTailClipPathPolygon
                }}
            />
        </div>
    );
}