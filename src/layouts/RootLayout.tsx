import React from "react";
import { cn } from "~/lib/utils";

interface RootLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RootLayout({ children, className }: RootLayoutProps) {
    return (
        <div className={cn("font-arsenal", className)}>
            {children}
        </div>
    );
}