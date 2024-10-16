import { TableCell } from "~/components/ui/Table";
import { EqualityRelation } from "~/lib/play";
import { cn } from "~/lib/utils";

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
}

function ComparisonCell({ equalityRelation, children, className }: ComparisonCellProps) {
    return (
        <TableCell className={cn(
            equalityRelation === EqualityRelation.Equal && "bg-blue-light text-black",
            equalityRelation === EqualityRelation.Partial && "bg-yellow text-black",
            equalityRelation === EqualityRelation.Disjoint && "bg-red text-white",
            className
        )}>
            {children}
        </TableCell>
    );
}

interface GuessCellProps {
    isSubmitted?: boolean;
    equalityRelation: EqualityRelation;
    children: React.ReactNode;
    className?: string;
}

export function GuessCell({ isSubmitted = false, equalityRelation, children, className }: GuessCellProps) {
    const Comp = isSubmitted ? ComparisonCell : PreviewCell;

    return (
        <Comp equalityRelation={equalityRelation} className={cn("text-center", className)}>
            {children}
        </Comp>
    );
}