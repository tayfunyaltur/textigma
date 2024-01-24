
interface ButtonProps {
    children: React.ReactNode;
    onClick: (e:React.MouseEvent<HTMLElement>) => void;
    buttonType?: "primary" | "secondary" | "outline" | "text";
    size?: "xs" | "sm" | "md" | "lg";
    disabled?: boolean;
    className?: string;
}

const Button = ({
    children,
    onClick,
    buttonType = "primary",
    size = "md",
    disabled,
    className,
}: ButtonProps) => {
    const styles = {
        primary: "bg-blue text-white border-blue",
        secondary: "bg-green text-black border-green",
        outline: "bg-transparent border border-blue text-blue",
        text: "bg-transparent text-blue border-transparent",
    };

    const sizes = {
        xs: "py-0.5 px-1 text-xs",
        sm: "py-1 px-2 text-sm",
        md: "py-2 px-4 text-md",
        lg: "py-3 px-6 text-lg",
    };

    return (
        <button
            onClick={(e: React.MouseEvent<HTMLElement>) => {
                onClick(e);
                e.stopPropagation();
            }}
            disabled={disabled}
            className={`shadow-md shadow-zinc-700 disabled:cursor-not-allowed group ${styles[buttonType]} ${sizes[size]} rounded-sm uppercase border-2 hover:outline hover:outline-black flex h-fit ${className}`}
        >
            <span className="opacity-0 group-disabled:opacity-100">x</span>
            <span className="opacity-0 group-hover:opacity-100 group-disabled:opacity-0">
                [
            </span>
            {children}
            <span className="opacity-0 group-hover:opacity-100 group-disabled:opacity-0">
                ]
            </span>
            <span className="opacity-0 group-disabled:opacity-100">x</span>
        </button>
    );
};

export default Button;
