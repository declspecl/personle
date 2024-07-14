import { clsx } from "clsx";
import { cn } from "~/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority"

const buttonVariants = cva(
    clsx(
        "relative inline-flex items-center justify-center whitespace-nowrap text-base",
        "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10",
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
            },
            skewMagnitude: {
                none: "before:skew-x-0",
                xxs: "before:-skew-x-[4deg]",
                xs: "before:-skew-x-[8deg]",
                sm: "before:-skew-x-[12deg]",
                md: "before:-skew-x-[16deg]",
                lg: "before:-skew-x-[20deg]"
            }
        },
        defaultVariants: {
            palette: "whiteText",
            size: "md",
            skewMagnitude: "lg"
        }
    }
);

interface ButtonProps
extends
    React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>
{
    rotate?: boolean,
    asChild?: boolean
}

export function Button({ palette, destructive, size, skewMagnitude, className, children, rotate = true, asChild = false, ...props }: ButtonProps) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            className={cn(
                buttonVariants({ palette, destructive, size, skewMagnitude }),
                rotate && "before:rotate-6",
                className
            )}
            {...props}
        >
            {children}
        </Comp>
    );
}