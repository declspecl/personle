import { useQuery } from "@tanstack/react-query";
import { getDailyGuesses } from "~/lib/server/api";

export function StatsPage() {
    const { isPending, error, data } = useQuery({
        queryKey: ["getGuesses"],
        queryFn: getDailyGuesses
    });

    return (
        <>
            {isPending ? (
                <p className="text-white">Loading...</p>
            ) : error ? (
                <p className="text-white">An error occurred: {error.message}</p>
            ) : (
                <p className="text-white">{JSON.stringify(data)}</p>
            )}
        </>
    );
}