import { useState } from "react";
import { NewspaperText } from "./components/typography/NewspaperText";

export function App() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <NewspaperText text="count"></NewspaperText>

            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    )
}