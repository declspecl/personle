import { useEffect, useState } from "react";

type WindowDimensions = {
    width: number;
    height: number;
};

interface ResponsiveWindowContainerProps extends React.HTMLAttributes<HTMLDivElement> {

}

export function ResponsiveWindowContainer({ className, children, ...props }: ResponsiveWindowContainerProps) {
    const [windowSize, setWindowSize] = useState<WindowDimensions>({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const windowResizeHandler = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener("resize", windowResizeHandler);

        return () => {
            window.removeEventListener("resize", windowResizeHandler);
        }
    }, []);

    return (
        <div
            className={className}
            style={{
                width: windowSize.width,
                height: windowSize.height
            }}
            {...props}
        >
            {children}
        </div>
    );
}