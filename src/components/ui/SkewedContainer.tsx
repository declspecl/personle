import { Slot } from "@radix-ui/react-slot";
import { convertRemToPixels } from "~/lib/utils";
import { useWindowDimensions } from "~/hooks/useWindowDimensions";
import React, { useLayoutEffect, useRef, useState } from "react";

interface SkewedContainerProps {
    className: string,
    children: React.ReactNode,
    deltaWidthRem: number,
    skewDirection: "left" | "right",
    asChild?: boolean
}

export function SkewedContainer({ className, children, deltaWidthRem, skewDirection, asChild = false }: SkewedContainerProps) {
    const [skew, setSkew] = useState(0);
    const windowDimensions = useWindowDimensions();

    const elementRef = useRef<HTMLDivElement>(null!);

    // using `useLayoutEffect` to avoid skew of 0 on first render resulting in layout shift
    useLayoutEffect(() => {
        const newSkew = calculateSkewForDeltaWidthPixels(convertRemToPixels(deltaWidthRem / 2)) * (skewDirection === "left" ? 1 : -1);
        setSkew(newSkew);

        const calculatedWidth = elementRef.current.offsetWidth + Math.abs(elementRef.current.offsetHeight * Math.tan(newSkew));
        console.log(calculatedWidth);
    }, [windowDimensions, deltaWidthRem, skewDirection]);

    const calculateSkewForDeltaWidthPixels = (deltaWidthPixels: number) => {
        //        /|
        //       / |
        //      /  |
        //     /   |
        //    /    | deltaWidth
        //   /     |
        //  /      |
        // / skew  |
        // ---------
        //   height
        //
        // newWidth = width + (height * tan(skew))
        // atan((newWidth - width) / height) = skew
        // atan(deltaWidth / height) = skew

        return Math.atan(deltaWidthPixels / elementRef.current.offsetHeight);
    }

    const Comp = asChild ? Slot : "div";

    return (
        <Comp
            ref={elementRef}
            className={className}
            style={{
                transform: `skewX(${skew}rad)`
            }}
        >
            {children}
        </Comp>
    );
}