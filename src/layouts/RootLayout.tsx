import React from "react";
import { cn } from "~/lib/utils";

interface RootLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RootLayout({ children, className, ...props }: RootLayoutProps) {
    return (
        <div className={cn("w-full h-full font-arsenal", className)} {...props}>
            {children}
        </div>
    );
}