import { Link } from "react-router-dom";
import { ConfirmationTick } from "~/components/graphics/ConfirmationTick";
import { DateWithDay } from "~/components/typography/DateWithDay";
import { NewspaperText } from "~/components/typography/NewspaperText";
import { MessageBox } from "~/components/ui/MessageBox";
import { cn } from "~/lib/utils";

interface PlayProps {

}

export function PlayPage(props: PlayProps) {
    return (
        <>
            <div className="w-full flex flex-col gap-4">
                <Link to="/">
                    <NewspaperText
                        text="Personle!"
                        redLetters={["o"]}
                        element="h1"
                        palette="whiteOnTransparent"
                        className={cn(
                            "mx-auto w-fit block text-[min(12.5vw,5rem)]"
                        )}
                    />
                </Link>

                <DateWithDay className="self-start text-[min(7.5vw,2.5rem)] -rotate-12" />
                
                <div className="w-full flex flex-row justify-end">
                    <MessageBox tailDirection="right" className="text-white">
                        <p>yoyoyqweiuqiweuqwioeo</p>
                        <p>yoyoyo</p>
                        <p>yoyoyo</p>
                        <p>yoyoyo</p>
                        <p>yoyoyo</p>
                    </MessageBox>
                </div>

                <div className="w-full flex flex-row justify-start">
                    <MessageBox tailDirection="left" className="text-white">
                        <p>yoyoyqweiuqiweuqwioeo</p>
                        <p>yoyoyo</p>
                        <p>yoyoyo</p>
                        <p>yoyoyo</p>
                        <p>yoyoyo</p>
                    </MessageBox>
                </div>
            </div>
        </>
    );
}