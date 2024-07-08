import { cn } from "~/lib/utils"

interface ViewportCentered extends React.HTMLAttributes<HTMLDivElement> {

}

export function ViewportCentered({ className, children, ...props }: ViewportCentered) {
    return (
        <div className="min-w-[100dvw] min-h-[100svh] flex">
            <div
                className={cn(
                    "m-6 grow",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </div>
    );
}