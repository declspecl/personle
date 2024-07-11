import { StarBackground } from "./StarBackground";
import { ContourBackground } from "./ContourBackground";

interface PersonleBackgroundProps {
    stripThickness: number
}

export function PersonleBackground({ stripThickness }: PersonleBackgroundProps) {
    const contourClipPathPolygon = `polygon(0% 0%, 0% 100%, calc(50% - ${stripThickness}rem) 100%, calc(50% - ${stripThickness / 2}rem) 0%)`;
    const starClipPathPolygon = `polygon(calc(50% + ${stripThickness}rem) 0%, calc(50% + ${stripThickness / 2}rem) 100%, 100% 100%, 100% 0%)`;

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-white -z-50">
            <ContourBackground
                className="absolute top-0 left-0 w-full min-h-[100svh] h-full -z-40"
                style={{
                    clipPath: contourClipPathPolygon,
                    WebkitClipPath: contourClipPathPolygon
                }}
            />

            <StarBackground
                className="absolute top-0 left-0 w-full min-h-[100svh] h-full -z-40"
                style={{
                    clipPath: starClipPathPolygon,
                    WebkitClipPath: starClipPathPolygon
                }}
            />
        </div>
    );
}