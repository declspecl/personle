import { cn } from "@lib/utils";
import { ComponentProps } from "react";
import { SkewedContainer } from "./SkewedContainer";

export function Skeleton({ deltaWidthRem, skewDirection, className, ...props }: ComponentProps<typeof SkewedContainer>) {
	return <SkewedContainer deltaWidthRem={deltaWidthRem} skewDirection={skewDirection} className={cn("animate-pulse bg-grey-dark", className)} {...props} />;
}
