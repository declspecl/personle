import React, { useMemo, useState } from "react";

interface NewspaperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    text: string
}

export function NewspaperText({ text, className, ...props }: NewspaperTextProps) {
    const [displayText, setDisplayText] = useState("");

    useMemo(() => {
        let displayText = "";

        for (const entry of text.split("").entries()) {
            displayText += entry;
        }

        setDisplayText(displayText);
    }, [text]);

    return (
        <p className={className} {...props}>
            {displayText}
        </p>
    );
}