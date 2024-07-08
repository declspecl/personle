import { ContourBackground } from "./ContourBackground";
import { StarBackground } from "./StarBackground";

export function PersonleBackground() {
    const minStripThickness = "-2rem";
    const additionalThickness = "5rem";

    return (
        <div className="relative w-full h-full bg-white -z-20">
            <ContourBackground
                className="absolute top-0 left-0 w-full min-h-[100svh] h-full -z-10"
                style={{
                    //                  TL      BL                                  BR                                                  TR
                    clipPath: `polygon(0% 0%, 0% 100%, calc(50% - ${minStripThickness} - ${additionalThickness}) 100%, calc(50% - ${minStripThickness}) 0%)`,
                    WebkitClipPath: `polygon(0% 0%, 0% 100%, calc(50% - ${minStripThickness} - ${additionalThickness}) 100%, calc(50% - ${minStripThickness}) 0%)`
                }}
            />

            <StarBackground
                className="absolute top-0 left-0 w-full min-h-[100svh] h-full -z-10"
                style={{
                    //                                                TL                                                  BL                    BR        TR
                    clipPath: `polygon(calc(50% + ${minStripThickness} + ${additionalThickness}) 0%, calc(50% + ${minStripThickness}) 100%, 100% 100%, 100% 0%)`,
                    WebkitClipPath: `polygon(calc(50% + ${minStripThickness} + ${additionalThickness}) 0%, calc(50% + ${minStripThickness}) 100%, 100% 100%, 100% 0%)`
                }}
            />
        </div>
    );
}