import { memo, useState } from "react";
import { Button } from "./components/ui/Button";
import { NewspaperText } from "./components/typography/NewspaperText";
import { StarBackground } from "./components/graphics/StarBackground";

export function App() {
    const [count, setCount] = useState(0)

    const MemoizedNewspaperText = memo(NewspaperText);

    return (
        <div className="w-screen h-screen bg-red-500">
            <MemoizedNewspaperText text="Personle!" size="7xl" palette="blackOnWhite" />
            <MemoizedNewspaperText text="School Life" size="7xl" palette="whiteOnBlack" />
            <MemoizedNewspaperText text="1234567890!@#$%^&*()" size="7xl" palette="whiteOnBlack" />

            <Button palette="blackText" size="sm" onClick={() => setCount(count + 1)}>
                Increment
            </Button>
            <Button palette="blackText" size="md" onClick={() => setCount(count + 1)}>
                Increment
            </Button>
            <Button palette="blackText" size="lg" onClick={() => setCount(count + 1)}>
                Increment
            </Button>
            <Button palette="blackText" size="icon" onClick={() => setCount(count + 1)}>
                Increment
            </Button>

            <StarBackground width={800} height={800} />
        </div>
    )
}