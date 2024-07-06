import PoissonDiskSampling from "poisson-disk-sampling";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

interface StarBackgroundProps extends React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {

}

export function StarBackground({ width, height, className, ...props }: StarBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null!);

    const [points, setPoints] = useState<number[][]>(null!);

    useLayoutEffect(() => {
        const pds = new PoissonDiskSampling({
            shape: [canvasRef.current.width, canvasRef.current.height],
            minDistance: 64,
            tries: 15
        });

        pds.fill();

        setPoints(pds.getAllPoints());
    }, []);

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
        const ctx = canvasRef.current.getContext("2d")!;

        let isCancelled = false;

        requestAnimationFrame(() => {
            if (isCancelled) return;
            
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

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
    }, [points, drawNestedStars]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className={className}
            {...props}
        />
    );
}