import { clsx } from "clsx";
import { cn } from "~/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority"

const buttonVariants = cva(
    clsx(
        "relative inline-flex items-center justify-center whitespace-nowrap text-base",
        "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-skew-x-[20deg] before:rotate-6 before:-z-10",
        "focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
    ),
    {
        variants: {
            palette: {
                blackText: "before:bg-transparent text-black hover:before:bg-black hover:text-white",
                whiteText: "before:bg-transparent text-white hover:before:bg-white hover:text-black",
            },
            destructive: {
                true: "hover:before:bg-red hover:text-white"
            },
            size: {
                sm: "h-9 px-3 text-sm",
                md: "h-10 px-4",
                lg: "h-10 px-6 text-lg",
                xl: "h-10 px-8 text-xl font-bold",
                icon: "h-10 w-10"
            }
        },
        defaultVariants: {
            palette: "whiteText",
            size: "md"
        }
    }
);

interface ButtonProps
extends
    React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>
{
    asChild?: boolean
}

export function Button({ palette, destructive, size, className, children, asChild = false, ...props }: ButtonProps) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            className={cn(
                buttonVariants({ palette, destructive, size }),
                className
            )}
            {...props}
        >
            <div>
                <span>
                    {children}
                </span>
            </div>
        </Comp>
    );
}