import { cva, VariantProps } from "class-variance-authority"
import { cn } from "~/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center -skew-x-[20deg] rotate-[9deg] whitespace-nowrap text-base focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            palette: {
                blackText: "bg-transparent text-black hover:bg-black hover:text-white",
                whiteText: "bg-transparent text-white hover:bg-white hover:text-black",
            },
            destructive: {
                true: "hover:bg-red"
            },
            size: {
                sm: "h-9 px-3",
                md: "h-10 px-6 py-2",
                lg: "h-11 px-6",
                icon: "h-10 w-10"
            }
        },
        defaultVariants: {
            size: "md"
        }
    }
);

interface ButtonProps
extends
    React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>
{}

export function Button({ palette, destructive, size, className, children, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                buttonVariants({ palette, destructive, size }),
                className
            )}
            {...props}
        >
            <span className="skew-x-[20deg] -rotate-[9deg]">
                {children}
            </span>
        </button>
    );
}