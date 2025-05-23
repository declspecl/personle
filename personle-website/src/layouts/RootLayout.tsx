import React from "react";
import { cn } from "@lib/utils";
import { Outlet } from "react-router-dom";
import { SkewedContainer } from "@ui/SkewedContainer";
import { RepsonsiveViewportContainer } from "./ResponsiveViewportContainer";
import { PersonleBackground } from "@components/graphics/PersonleBackground";

interface RootLayoutProps {
	className?: string;
	children?: React.ReactNode;
}

export function RootLayout({ className, children }: RootLayoutProps) {
	return (
		<div className={cn("relative w-full h-full overflow-hidden font-arsenal", className)}>
			<PersonleBackground stripThickness={1.5} />

			<RepsonsiveViewportContainer className={cn("p-4 flex flex-col items-center overflow-auto", "sm:px-6", "md:px-8 md:py-8")}>
				<SkewedContainer
					deltaWidthRem={2}
					skewDirection="right"
					className={cn("grow mx-auto p-6 w-full flex flex-col bg-white", "sm:w-[36rem] sm:p-8", "md:w-[44rem]", "lg:w-[60rem]", "xl:w-[72rem]")}
				>
					<main className={cn("grow p-6 w-full flex flex-col gap-8 bg-black -z-10")}>
						{children}
						<Outlet />
					</main>
				</SkewedContainer>
			</RepsonsiveViewportContainer>
		</div>
	);
}
