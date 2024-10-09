import PoissonDiskSampling from "poisson-disk-sampling";
import { useCallback, useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "~/hooks/useWindowDimensions";

const STAR_BACKGROUND_COLOR = "#ffffff";
const STAR_PRIMARY_COLOR = "#000000", STAR_SECONDARY_COLOR = "#666666";
const STAR_MIN_RADIUS = 10, STAR_MAX_RADIUS = 18;
const STAR_MIN_LAYERS = 5, STAR_MAX_LAYERS = 8;
const STAR_MIN_ROTATION_RADIANS = 0, STAR_MAX_ROTATION_RADIANS = Math.PI * 2;
const STAR_SECONDARY_MODULO_INTERVAL = 7;

interface StarBackgroundProps extends React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {

}

export function StarBackground({ className, ...props }: StarBackgroundProps) {
    const windowDimensions = useWindowDimensions();
    const canvasRef = useRef<HTMLCanvasElement>(null!);
    const [points, setPoints] = useState<number[][]>([]);

    useEffect(() => {
        canvasRef.current.width = windowDimensions.width;
        canvasRef.current.height = windowDimensions.height;

        const pds = new PoissonDiskSampling({
            shape: [windowDimensions.width, windowDimensions.height],
            minDistance: 64,
            tries: 15
        });

        pds.fill();

        setPoints(pds.getAllPoints());
    }, [windowDimensions]);

    const drawStar = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, rotation: number, color: string): void => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.moveTo(0, -radius);
        ctx.beginPath();

        for (let i = 0; i < 5; i++) {
            ctx.rotate(Math.PI / 5);
            ctx.lineTo(0, 0 - radius * 0.5);
            ctx.rotate(Math.PI / 5);
            ctx.lineTo(0, 0 - radius);
        }

        ctx.rotate(-rotation);

        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }, []);
    
    const drawNestedStars = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, rotation: number, colors: string[], layers: number): void => {
        for (let i = layers; i > 0; i--) {
            const color = colors[i % colors.length];

            // don't draw the outer layer if it's background
            if (i === layers && color === STAR_BACKGROUND_COLOR) continue;

            drawStar(ctx, x, y, radius * i, rotation, color);
        }
    }, [drawStar]);

    useEffect(() => {
        if (points === null || canvasRef.current === null) return;

        const ctx = canvasRef.current.getContext("2d")!;

        let isCancelled = false;

        requestAnimationFrame(() => {
            if (isCancelled) return;
            
            ctx.clearRect(0, 0, windowDimensions.width, windowDimensions.height);

            for (const [i, point] of points.entries()) {
                const radius = Math.floor(Math.random() * (STAR_MAX_RADIUS - STAR_MIN_RADIUS)) + STAR_MIN_RADIUS;
                const layers = Math.floor(Math.random() * (STAR_MAX_LAYERS - STAR_MIN_LAYERS)) + STAR_MAX_LAYERS;
                const rotation = (Math.random() * (STAR_MAX_ROTATION_RADIANS - STAR_MIN_ROTATION_RADIANS)) + STAR_MIN_ROTATION_RADIANS;
                const primaryColor = i % STAR_SECONDARY_MODULO_INTERVAL === 0 ? STAR_SECONDARY_COLOR : STAR_PRIMARY_COLOR;
                const isPrimaryInner = Math.random() < 0.5;

                drawNestedStars(
                    ctx,
                    point[0],
                    point[1],
                    radius,
                    rotation,
                    isPrimaryInner
                        ? [STAR_BACKGROUND_COLOR, primaryColor]
                        : [primaryColor, STAR_BACKGROUND_COLOR],
                    layers
                );
            }
        });

        return () => {
            isCancelled = true;
        }
    }, [points, drawNestedStars, windowDimensions]);

    return (
        <canvas
            ref={canvasRef}
            width={windowDimensions.width}
            height={windowDimensions.height}
            className={className}
            {...props}
        />
    );
}