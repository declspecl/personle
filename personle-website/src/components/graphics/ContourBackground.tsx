import { cn } from "@lib/utils";

interface ContourBackgroundProps extends React.HTMLAttributes<HTMLImageElement> {}

export function ContourBackground({ className, ...props }: ContourBackgroundProps) {
	return <div className={cn("bg-red bg-[url(/assets/images/contour-noise.webp)] bg-contain", className)} {...props} />;
}
