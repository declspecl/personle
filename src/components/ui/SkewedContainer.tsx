import { useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "~/hooks/useWindowDimensions";
import { cn, convertRemToPixels } from "~/lib/utils";

interface SkewedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    deltaWidthRem: number,
    skewDirection: "left" | "right"
}

export function SkewedContainer({ className, children, deltaWidthRem, skewDirection, ...props }: SkewedContainerProps) {
    const [skew, setSkew] = useState(0);
    const windowDimensions = useWindowDimensions();
    const elementRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        const newSkew = calculateSkewFordeltaWidthPixels(convertRemToPixels(deltaWidthRem)) * (skewDirection === "left" ? 1 : -1);

        elementRef.current.style.setProperty("--skew", newSkew + "rad");

        setSkew(newSkew);

        const calculatedWidth = elementRef.current.offsetWidth + Math.abs(elementRef.current.offsetHeight * Math.tan(newSkew));
        console.log(calculatedWidth);
    }, [windowDimensions, deltaWidthRem, skewDirection]);

    const calculateSkewFordeltaWidthPixels = (deltaWidthPixels: number) => {
        // newWidth = width + (height * tan(skew))
        // atan((newWidth - width) / height) = skew
        // atan(deltaWidth / height) = skew

        return Math.atan(deltaWidthPixels / elementRef.current.offsetHeight);
    }

    return (
        <div
            ref={elementRef}
            className={cn(
                className
            )}
            style={{
                transform: `skewX(${skew}rad)`
            }}
            {...props}
        >
            <div style={{
                transform: `skewX(${-skew}rad)`
            }}>
                {children}
            </div>
        </div>
    );
}