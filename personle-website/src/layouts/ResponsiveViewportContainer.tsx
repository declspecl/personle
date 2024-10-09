import { cn } from "~/lib/utils"
import { Slot } from "@radix-ui/react-slot";

interface RepsonsiveViewportContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean
}

export function RepsonsiveViewportContainer({ className, children, asChild = false, ...props }: RepsonsiveViewportContainerProps) {
    const Comp = asChild ? Slot : "div";

    return (
        <Comp className={cn("min-w-[100svw] w-full min-h-[100svh] h-full", className)} {...props}>
            {children}
        </Comp>
    );
}