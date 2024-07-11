import { cn } from "~/lib/utils";
import { Outlet } from "react-router-dom";
import { SkewedContainer } from "~/components/ui/SkewedContainer";
import { RepsonsiveViewportContainer } from "./ResponsiveViewportContainer";
import { PersonleBackground } from "~/components/graphics/PersonleBackground";

interface RootLayoutProps {
    className?: string
}

export function RootLayout({ className }: RootLayoutProps) {
    return (
        <div className={cn("relative w-full h-full overflow-hidden font-arsenal", className)}>
            <PersonleBackground stripThickness={2} />

            <RepsonsiveViewportContainer className={cn(
                "p-4 flex flex-col items-center overflow-auto",
                "sm:px-6",
                "md:px-8 md:py-8"
            )}>
                <SkewedContainer
                    deltaWidthRem={2}
                    skewDirection="right"
                    className={cn(
                        "grow mx-auto p-8 w-full flex flex-col bg-white",
                        "sm:w-[40rem]",
                        "md:w-[48rem]",
                        "lg:w-[64rem]"
                    )}
                >
                    <main className={cn(
                        "grow p-4 w-full flex flex-col gap-8 bg-black -z-10"
                    )}>
                        <Outlet />
                    </main>
                </SkewedContainer>
            </RepsonsiveViewportContainer>
        </div>
    );
}