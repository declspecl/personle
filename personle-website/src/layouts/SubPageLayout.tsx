import React from "react";
import { cn } from "@lib/utils";
import { Link, Outlet } from "react-router-dom";
import { NewspaperText } from "@components/typography/NewspaperText";

interface SubPageLayoutProps {
	className?: string;
	children?: React.ReactNode;
}

export function SubPageLayout({ className, children }: SubPageLayoutProps) {
	return (
		<div className={cn("w-full flex flex-col gap-6", className)}>
			<Link to="/">
				<NewspaperText
					text="Personle!"
					redLetters={["o"]}
					element="h1"
					palette="whiteOnTransparent"
					className={cn("mx-auto w-fit block text-[min(12.5vw,5rem)]")}
				/>
			</Link>

			{children}
			<Outlet />
		</div>
	);
}
