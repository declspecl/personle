import { memo, useState } from "react";
import { NewspaperText } from "./components/typography/NewspaperText";

export function App() {
    const [count, setCount] = useState(0)

    const MemoizedNewspaperText = memo(NewspaperText);

    return (
        <div className="w-screen h-screen bg-red-500">
            <MemoizedNewspaperText text="Personle" size="7xl" palette="blackOnWhite" />
            <MemoizedNewspaperText text="School Life" size="7xl" palette="whiteOnBlack" />

            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    )
}