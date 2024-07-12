import { cva, VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const confirmationTickVariants = cva(
    "",
    {
        variants: {
            size: {
                sm: "w-4 h-12",
                md: "w-6 h-20",
                lg: "w-8 h-28"
            }
        },
        defaultVariants: {
            size: "md"
        }
    }
);

interface ConfirmationTickProps extends VariantProps<typeof confirmationTickVariants> {
    className?: string
}

export function ConfirmationTick({ size, className }: ConfirmationTickProps) {
    const tickClipPathPolygon = "polygon(0% 0%, 100% 0%, 60% 95%, 40% 100%)";

    return (
        <div
            className="p-2 w-fit h-fit bg-black rotate-12"
            style={{
                clipPath: tickClipPathPolygon,
                WebkitClipPath: tickClipPathPolygon
            }}
        >
            <div
                className={cn(
                    "bg-white",
                    confirmationTickVariants({ size }),
                )}
                style={{
                    clipPath: tickClipPathPolygon,
                    WebkitClipPath: tickClipPathPolygon
                }}
            />
        </div>
    );
}