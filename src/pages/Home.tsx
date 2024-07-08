import { PersonleBackground } from "~/components/graphics/PersonleBackground";
import { SkewedContainer } from "~/components/ui/SkewedContainer";
import { cn } from "~/lib/utils";

export function Home() {
    return (
        <div className={cn("relative w-full h-full")}>
            <PersonleBackground />

            <div className={cn(
                "absolute top-0 left-0 p-4 w-full min-h-[100svh] h-full flex flex-col items-center",
                "sm:p-6",
                "md:p-8"
            )}>
                <SkewedContainer
                    deltaWidthRem={1}
                    skewDirection="right"
                    className={cn(
                        "mx-auto w-full bg-white",
                        "sm:w-[600px]",
                        "md:w-[720px]"
                    )}
                >
                    <p>yo</p>
                </SkewedContainer>
            </div>
        </div>
    );
}