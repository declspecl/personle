import { cn } from "~/lib/utils";
import { SkewedContainer } from "~/components/ui/SkewedContainer";
import { PersonleBackground } from "~/components/graphics/PersonleBackground";
import { RepsonsiveViewportContainer } from "~/layouts/ResponsiveViewportContainer";
import { NewspaperText } from "~/components/typography/NewspaperText";
import { Button } from "~/components/ui/Button";

export function Home() {
    return (
        <div className="relative w-full h-full overflow-hidden">
            <PersonleBackground stripThickness={3} />

            <RepsonsiveViewportContainer className={cn(
                "px-8 py-4 flex flex-col items-center overflow-auto",
                "sm:px-6",
                "md:px-8 md:py-8",
                "lg:py-12"
            )}>
                <SkewedContainer
                    deltaWidthRem={2}
                    skewDirection="right"
                    className={cn(
                        "grow mx-auto p-8 w-full flex flex-col bg-white",
                        "sm:w-[40rem]",
                        "md:w-[48rem]",
                        "lg:w-[64rem]"
                    )}
                >
                    <SkewedContainer
                        deltaWidthRem={0}
                        skewDirection="right"
                        className={cn(
                            "grow p-4 w-full bg-black"
                        )}
                        asChild
                    >
                        {/* TODO: investigate adding another SkewedContainer to keep the black bg skewed but return skew back to normal for child contents, and how this affects responsiveness*/}

                        <main>
                            <NewspaperText
                                text="Personle!"
                                redLetters={["o"]}
                                element="h1"
                                palette="whiteOnTransparent"
                                className={cn(
                                    "mx-auto w-fit block text-5xl lg:text-6xl xl:text-7xl"
                                )}
                            />

                            <NewspaperText
                                text="Personle!"
                                redLetters={["o"]}
                                element="h1"
                                palette="whiteOnTransparent"
                                className={cn(
                                    "mx-auto w-fit block text-5xl lg:text-6xl xl:text-7xl"
                                )}
                            />

                            <NewspaperText
                                text="abcdefghijkl"
                                redLetters={["a", "l", "c"]}
                                element="h1"
                                palette="whiteOnTransparent"
                                className={cn(
                                    "mx-auto w-fit block text-5xl lg:text-6xl xl:text-7xl"
                                )}
                            />

                            <br />

                            <p className="text-center text-white text-2xl">Test test 123</p>

                            <Button palette="whiteText" size="lg" destructive>
                                Click me!
                            </Button>

                            <Button palette="blackText" size="lg" destructive>
                                Click me!
                            </Button>

                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                            <p className="text-white">Click me!</p>
                        </main>
                    </SkewedContainer>
                </SkewedContainer>
            </RepsonsiveViewportContainer>
        </div>
    );
}