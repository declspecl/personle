import gsap from "gsap";
import { useRef } from "react";
import { cn } from "~/lib/utils";
import { useGSAP } from "@gsap/react";
import { EqualityRelation } from "~/lib/play";
import { TableCell } from "~/components/ui/Table";
import { SkewedContainer } from "~/components/ui/SkewedContainer";
import { COLOR_BLACK, COLOR_BLUE_LIGHT, COLOR_RED, COLOR_WHITE, COLOR_YELLOW } from "~/lib/constants";

interface PreviewCellProps {
    children: React.ReactNode;
    className?: string;
}

function PreviewCell({ children, className }: PreviewCellProps) {
    return (
        <TableCell className={className}>
            {children}
        </TableCell>
    );
}

interface ComparisonCellProps extends PreviewCellProps {
    equalityRelation: EqualityRelation;
    animationDelay: number;
}

function ComparisonCell({ equalityRelation, animationDelay, children, className }: ComparisonCellProps) {
    const cellRef = useRef<HTMLTableCellElement>(null!);

    useGSAP(
        () => {
            switch (equalityRelation) {
                case EqualityRelation.Equal:
                    gsap.to(cellRef.current, {
                        "--relation-bg-color": COLOR_BLUE_LIGHT,
                        "--relation-fg-color": COLOR_BLACK,
                        duration: 0.25,
                        delay: animationDelay
                    });
                    break;
                case EqualityRelation.Partial:
                    gsap.to(cellRef.current, {
                        "--relation-bg-color": COLOR_YELLOW,
                        "--relation-fg-color": COLOR_BLACK,
                        duration: 0.25,
                        delay: animationDelay
                    });
                    break;
                case EqualityRelation.Disjoint:
                    gsap.to(cellRef.current, {
                        "--relation-bg-color": COLOR_RED,
                        "--relation-fg-color": COLOR_WHITE,
                        duration: 0.25,
                        delay: animationDelay
                    });
                    break;
            }
        },
        { scope: cellRef }
    );

    return (
        <TableCell
            ref={cellRef}
            className={cn("relative text-[var(--relation-fg-color)] overflow-hidden", className)}
            style={{
                "--relation-bg-color": "#000000",
                "--relation-fg-color": "#ffffff",
            } as React.CSSProperties}
        >
            <SkewedContainer
                skewDirection="right"
                deltaWidthRem={0.5}
                className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[2deg] w-11/12 h-[86.66%] bg-[var(--relation-bg-color)] -z-[1]"
            />

            {children}
        </TableCell>
    );
}

interface GuessCellProps extends ComparisonCellProps {
    isSubmitted?: boolean;
}

export function GuessCell({ isSubmitted = false, equalityRelation, animationDelay, children, className }: GuessCellProps) {
    const Comp = isSubmitted ? ComparisonCell : PreviewCell;

    return (
        <Comp equalityRelation={equalityRelation} animationDelay={animationDelay} className={cn("text-center", className)}>
            {children}
        </Comp>
    );
}