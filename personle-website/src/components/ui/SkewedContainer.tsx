import React, { useRef } from "react";
import { Slot } from "@radix-ui/react-slot";

interface SkewedContainerProps {
    skewDirection: "left" | "right",
    deltaWidthRem: number,

    asChild?: boolean,
    className?: string,
    children?: React.ReactNode
}

export function SkewedContainer({ deltaWidthRem, skewDirection, asChild = false, className, children }: SkewedContainerProps) {
    const elementRef = useRef<HTMLDivElement>(null!);

    const tlXPos = skewDirection === "left"
        ? "0%"
        : `calc(0% + ${deltaWidthRem / 2}rem)`;

    const trXPos = skewDirection === "right"
        ? "100%"
        : `calc(100% - ${deltaWidthRem / 2}rem)`;

    const blXPos = skewDirection === "right"
        ? "0%"
        : `calc(0% + ${deltaWidthRem / 2}rem)`

    const brXPos = skewDirection === "left"
        ? "100%"
        : `calc(100% - ${deltaWidthRem / 2}rem)`;

    const clipPathPolygon = `polygon(${tlXPos} 0%, ${blXPos} 100%, ${brXPos} 100%, ${trXPos} 0%)`;

    const Comp = asChild ? Slot : "div";

    return (
        <Comp
            ref={elementRef}
            className={className}
            style={{
                clipPath: clipPathPolygon,
                WebkitClipPath: clipPathPolygon
            }}
        >
            {children}
        </Comp>
    );
}