import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { Skeleton } from "~/components/ui/Skeleton";
import { getGuesses } from "~/lib/backend/api";

function Inner() {
    const { isPending, error, data } = useSuspenseQuery({
        queryKey: ["getGuesses"],
        queryFn: getGuesses
    });

    return (
        <div>
            <p className="text-white">{JSON.stringify(isPending)}</p>
            <p className="text-white">{JSON.stringify(error)}</p>
            <p className="text-white">{JSON.stringify(data)}</p>
        </div>
    );
}

export function ProfilePage() {
    return (
        <Suspense fallback={<Skeleton deltaWidthRem={1} skewDirection="right" className="w-20 h-20" />}>
            <Inner />
        </Suspense>
    );
}