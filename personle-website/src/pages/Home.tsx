import { cn } from "~/lib/utils";
import { SiKofi } from "react-icons/si";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaGithub } from "react-icons/fa6";
import { Button } from "~/components/ui/Button";
import { NewspaperText } from "~/components/typography/NewspaperText";

export function HomePage() {
    return (
        <>
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
        </>
    );
}