import { cva, VariantProps } from "class-variance-authority"
import { clsx } from "clsx";
import { cn } from "~/lib/utils";

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
                sm: "h-9 px-3",
                md: "h-10 px-4",
                lg: "h-10 px-5",
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
            <div>
                <span>
                    {children}
                </span>
            </div>
        </button>
    );
}