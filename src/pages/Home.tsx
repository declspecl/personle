import { PersonleBackground } from "~/components/graphics/PersonleBackground";
import { SkewedContainer } from "~/components/ui/SkewedContainer";
import { cn } from "~/lib/utils";

export function Home() {
    return (
        <div className={cn("relative w-full h-full")}>
            <PersonleBackground stripThickness={0.5} />

            <div className={cn(
                "absolute top-0 left-0 p-4 w-full min-h-[100svh] h-full flex flex-col items-center",
                "sm:p-6",
                "md:p-8"
            )}>
                <SkewedContainer
                    deltaWidthRem={3}
                    skewDirection="right"
                    className={cn(
                        "grow mx-auto p-8 w-full flex flex-col bg-white",
                        "sm:w-[600px]",
                        "md:w-[720px]"
                    )}
                >
                    <SkewedContainer
                        deltaWidthRem={-3}
                        skewDirection="right"
                        className={cn(
                            "grow w-full bg-black"
                        )}
                    >
                        <p className="text-white">yo</p>
                    </SkewedContainer>
                </SkewedContainer>
            </div>
        </div>
    );
}