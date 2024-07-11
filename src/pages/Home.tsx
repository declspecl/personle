import { cn } from "~/lib/utils";
import { SiKofi } from "react-icons/si";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaGithub } from "react-icons/fa6";
import { Button } from "~/components/ui/Button";
import { SkewedContainer } from "~/components/ui/SkewedContainer";
import { NewspaperText } from "~/components/typography/NewspaperText";
import { PersonleBackground } from "~/components/graphics/PersonleBackground";
import { RepsonsiveViewportContainer } from "~/layouts/ResponsiveViewportContainer";

export function HomePage() {
    return (
        <div className="relative w-full h-full overflow-hidden">
            <PersonleBackground stripThickness={2} />

            <RepsonsiveViewportContainer className={cn(
                "p-4 flex flex-col items-center overflow-auto",
                "sm:px-6",
                "md:px-8 md:py-8"
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
                    <main className={cn(
                        "grow p-4 w-full flex flex-col gap-8 bg-black -z-10"
                    )}>
                        <Link to="/">
                            <NewspaperText
                                text="Personle!"
                                redLetters={["o"]}
                                element="h1"
                                palette="whiteOnTransparent"
                                className={cn(
                                    "mx-auto w-fit block text-[min(12.5vw,5rem)]"
                                )}
                            />
                        </Link>

                        <div className="grow flex flex-col justify-center items-center">
                            <Link to="/play">
                                <NewspaperText
                                    text="Play"
                                    redLetters={["P"]}
                                    palette="whiteOnTransparent"
                                    className={cn(
                                        "text-[min(12.5vw,4rem)]",
                                    )}
                                />
                            </Link>

                            <Link to="/profile">
                                <NewspaperText
                                    text="Profile"
                                    redLetters={["f"]}
                                    palette="whiteOnTransparent"
                                    className={cn(
                                        "text-[min(12.5vw,4rem)]",
                                    )}
                                />
                            </Link>

                            <Link to="/leaderboard">
                                <NewspaperText
                                    text="Leaderboard"
                                    redLetters={["L", "b"]}
                                    palette="whiteOnTransparent"
                                    className={cn(
                                        "text-[min(10vw,4rem)]",
                                    )}
                                />
                            </Link>

                            <Link to="/settings">
                                <NewspaperText
                                    text="Settings"
                                    redLetters={["e", "i"]}
                                    palette="whiteOnTransparent"
                                    className={cn(
                                        "text-[min(12.5vw,4rem)]",
                                    )}
                                />
                            </Link>
                        </div>

                        <div className="flex flex-row gap-4 justify-center items-center">
                            <IconContext.Provider value={{ className: "w-full aspect-square text-2xl md:text-3xl" }}>
                                <Button palette="whiteText" size="icon" asChild>
                                    <a href="https://github.com/declspecl/personle-website" target="_blank">
                                        <FaGithub />
                                    </a>
                                </Button>

                                <Button palette="whiteText" size="icon" asChild>
                                    <a href="https://ko-fi.com/declspecl" target="_blank">
                                        <SiKofi />
                                    </a>
                                </Button>
                            </IconContext.Provider>
                        </div>
                    </main>
                </SkewedContainer>
            </RepsonsiveViewportContainer>
        </div>
    );
}