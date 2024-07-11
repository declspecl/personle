interface PlayProps extends React.HTMLAttributes<HTMLDivElement> {

}

export function PlayPage({ className, children, ...props }: PlayProps) {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
}