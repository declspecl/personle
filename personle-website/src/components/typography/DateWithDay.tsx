import { cn } from "@lib/utils";
import { NewspaperText } from "./NewspaperText";

interface DateWithDayProps {
    className?: string
}

export function DateWithDay({ className }: DateWithDayProps) {
    const today = new Date();

    const formattedMonthAndDay = `${today.getMonth() + 1}/${today.getDate()}`;
    const weekdayName = today.toLocaleDateString("en-US", { weekday: "long" });

    return (
        <div className={cn("inline-block", className)}>
            <NewspaperText text={formattedMonthAndDay} className="text-center leading-none" />
            <NewspaperText text={weekdayName} className="text-center leading-none" />
        </div>
    );
}