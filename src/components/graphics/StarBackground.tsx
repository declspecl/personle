import { useCallback, useEffect, useRef } from "react";

interface StarBackgroundProps extends React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {

}

export function StarBackground({ width, height, className, ...props }: StarBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null!);

    const drawStar = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string): void => {
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.moveTo(0, -radius);

        for (let i = 0; i < 5; i++) {
            ctx.rotate(Math.PI / 5);
            ctx.lineTo(0, 0 - radius * 0.5);
            ctx.rotate(Math.PI / 5);
            ctx.lineTo(0, 0 - radius);
        }

        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }, []);
    
    const drawNestedStars = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, colors: string[], layers: number): void => {
        for (let i = layers; i > 0; i--) {
            const color = colors[i % colors.length];

            // don't draw the outer layer if it's white
            if (i === layers && color === "#ffffff") continue;

            drawStar(ctx, x, y, radius * i, color);
        }
    }, [drawStar]);

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d")!;

        let isCancelled = false;

        requestAnimationFrame(() => {
            if (isCancelled) return;
            
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            drawNestedStars(ctx, 0, 0, 10, ["#ffffff", "#666666"], 8);
            drawNestedStars(ctx, 100, 20, 12, ["#ffffff", "#000000"], 10);
        });

        return () => {
            isCancelled = true;
        }
    }, [drawNestedStars]);

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