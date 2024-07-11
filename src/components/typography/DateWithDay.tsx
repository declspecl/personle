import { cn } from "~/lib/utils";
import { NewspaperText } from "./NewspaperText";

interface DateWithDayProps {
    className?: string
}

export function DateWithDay({ className }: DateWithDayProps) {
    const today = new Date();

    const formattedMonthAndDay = `${today.getMonth()}/${today.getDate()}`;
    const weekdayName = today.toLocaleDateString("en-US", { weekday: "long" });

    return (
        <div className={cn("inline-block", className)}>
            <NewspaperText text={formattedMonthAndDay} className="text-center" />
            <NewspaperText text={weekdayName} className="text-center" />
        </div>
    );
}