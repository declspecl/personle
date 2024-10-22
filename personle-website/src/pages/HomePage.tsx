import { cn } from "@lib/utils";
import { Button } from "@ui/Button";
import { SiKofi } from "react-icons/si";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaGithub } from "react-icons/fa6";
import { NewspaperText } from "@components/typography/NewspaperText";

export function HomePage() {
	return (
		<>
			<Link to="/">
				<NewspaperText
					text="Personle!"
					redLetters={["o"]}
					element="h1"
					palette="whiteOnTransparent"
					className={cn("mx-auto w-fit block text-[min(12.5vw,5rem)]")}
				/>
			</Link>

			<div className="grow flex flex-col justify-center items-center">
				<Link to="/daily">
					<NewspaperText text="Daily Play" redLetters={["a"]} palette="whiteOnTransparent" className={cn("text-[min(11vw,4rem)]")} />
				</Link>

				<Link to="/freeplay">
					<NewspaperText text="Free Play" redLetters={["e"]} palette="whiteOnTransparent" className={cn("text-[min(11vw,4rem)]")} />
				</Link>

				<Link to="/stats">
					<NewspaperText text="Daily Stats" redLetters={["y", "S", "s"]} palette="whiteOnTransparent" className={cn("text-[min(11vw,4rem)]")} />
				</Link>

				<Link to="/compendium">
					<NewspaperText text="Compendium" redLetters={["o", "d"]} palette="whiteOnTransparent" className={cn("text-[min(10vw,4rem)]")} />
				</Link>
			</div>

			<div className="flex flex-row gap-4 justify-center items-center">
				<IconContext.Provider value={{ className: "w-full aspect-square text-2xl md:text-3xl" }}>
					<Button palette="whiteText" size="icon" asChild>
						<a href="https://github.com/declspecl/personle" target="_blank">
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
