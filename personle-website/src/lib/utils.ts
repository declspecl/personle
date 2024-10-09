import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function convertRemToPixels(rem: number) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function convertPixelsToRem(pixels: number) {    
    return pixels / parseFloat(getComputedStyle(document.documentElement).fontSize);
}