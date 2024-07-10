import { cn } from "~/lib/utils";
import { SkewedContainer } from "~/components/ui/SkewedContainer";
import { PersonleBackground } from "~/components/graphics/PersonleBackground";
import { RepsonsiveViewportContainer } from "~/layouts/ResponsiveViewportContainer";
import { NewspaperText } from "~/components/typography/NewspaperText";

export function Home() {
    return (
        <div className="relative w-full h-full">
            <PersonleBackground stripThickness={0.5} />

            <RepsonsiveViewportContainer className={cn(
                "p-4 flex flex-col items-center",
                "sm:px-6",
                "md:px-8"
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
                            "grow p-4 w-full bg-black"
                        )}
                        asChild
                    >
                        <main>
                            <NewspaperText
                                text="Personle!"
                                element="h1"
                                palette="whiteOnTransparent"
                                className={cn(
                                    "mx-auto w-fit block text-6xl"
                                )}
                            />
                        </main>
                    </SkewedContainer>
                </SkewedContainer>
            </RepsonsiveViewportContainer>
        </div>
    );
}