import { memo, useState } from "react";
import { NewspaperText } from "./components/typography/NewspaperText";

export function App() {
    const [count, setCount] = useState(0)

    const MemoizedNewspaperText = memo(NewspaperText);

    return (
        <div>
            <MemoizedNewspaperText text="Count" />

            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    )
}