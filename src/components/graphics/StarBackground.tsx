import PoissonDiskSampling from "poisson-disk-sampling";
import { useCallback, useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "~/hooks/useWindowDimensions";

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

            // don't draw the outer layer if it's white
            if (i === layers && color === "#ffffff") continue;

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
                const radius = Math.floor(Math.random() * 8) + 12;
                const layers = Math.floor(Math.random() * 3) + 6;
                const rotation = (Math.random() * Math.PI * 4) - (Math.PI * 2);
                const primaryColor = i % 8 === 0 ? "#666666" : "#000000";
                const isPrimaryInner = Math.random() < 0.5;

                drawNestedStars(
                    ctx,
                    point[0],
                    point[1],
                    radius,
                    rotation,
                    isPrimaryInner
                        ? ["#ffffff", primaryColor]
                        : [primaryColor, "#ffffff"],
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