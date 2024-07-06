import { StarBackground } from "~/components/graphics/StarBackground";
import { SkewedContainer } from "~/components/ui/SkewedContainer";

interface HomeProps extends React.HTMLAttributes<HTMLDivElement> {

}

export function Home({ className, children, ...props }: HomeProps) {
    return (
        <div className={className} {...props}>
            <StarBackground
                width={window.innerWidth}
                height={window.innerHeight}
                className="-z-10 absolute inset-0 w-screen h-screen"
            />

            <SkewedContainer className="ml-4 w-fit bg-red p-0.5" variant="smRight">
                <SkewedContainer className="bg-white p-0.25 h-80">
                    <p>Hello</p>
                </SkewedContainer>
            </SkewedContainer>

            {children}
        </div>
    );
}