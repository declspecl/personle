import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { NewspaperText } from "~/components/typography/NewspaperText";
import { getGuesses } from "~/lib/server/api";
import { cn } from "~/lib/utils";

export function ProfilePage() {
    const { isPending, error, data } = useQuery({
        queryKey: ["getGuesses"],
        queryFn: getGuesses
    });

    return (
        <div>
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

            {isPending ? (
                <p className="text-white">Loading...</p>
            ) : error ? (
                <p className="text-white">An error occurred: {error.message}</p>
            ) : (
                <p className="text-white">{JSON.stringify(data)}</p>
            )}
        </div>
    );
}