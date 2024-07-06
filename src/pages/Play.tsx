interface PlayProps extends React.HTMLAttributes<HTMLDivElement> {

}

export function Play({ className, children, ...props }: PlayProps) {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
}