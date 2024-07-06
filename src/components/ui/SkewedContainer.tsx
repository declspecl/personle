import { cva, VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const skewedContainerVariants = cva(
    "",
    {
        variants: {
            variant: {
                smLeft: "skew-x-2",
                mdLeft: "skew-x-3",
                lgLeft: "skew-x-6",
                smRight: "-skew-x-2",
                mdRight: "-skew-x-3",
                lgRight: "-skew-x-6"
            }
        }
    }
)

interface SkewedContainerProps
extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skewedContainerVariants>
{

}

export function SkewedContainer({ className, variant, children, ...props }: SkewedContainerProps) {
    let oppositeVariant: "smLeft" | "mdLeft" | "lgLeft" | "smRight" | "mdRight" | "lgRight" = "smLeft";

    switch (variant) {
        case "smLeft":
            oppositeVariant = "smRight";
            break;

        case "mdLeft":
            oppositeVariant = "mdRight";
            break;

        case "lgLeft":
            oppositeVariant = "lgRight";
            break;

        case "smRight":
            oppositeVariant = "smLeft";
            break;
        
        case "mdRight":
            oppositeVariant = "mdLeft";
            break;
        
        case "lgRight":
            oppositeVariant = "lgLeft";
            break;
    }

    return (
        <div
            className={cn(
                skewedContainerVariants({ variant }),
                className
            )}
            {...props}
        >
            <div className={skewedContainerVariants({ variant: oppositeVariant })}>
                {children}
            </div>
        </div>
    );
}