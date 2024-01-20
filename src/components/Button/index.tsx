interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    buttonType?: "primary" | "secondary" | "outline" | "text";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
}

const Button = ({
    children,
    onClick,
    buttonType = "primary",
    size = "md",
    disabled,
}: ButtonProps) => {
    const styles = {
        primary: "bg-blue text-white border-blue",
        secondary: "bg-green text-black border-green",
        outline: "bg-transparent border border-blue text-blue",
        text: "bg-transparent text-blue border-transparent",
    };

    const sizes = {
        sm: "py-1 px-2 text-sm",
        md: "py-2 px-4 text-md",
        lg: "py-3 px-6 text-lg",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${styles[buttonType]} ${sizes[size]} rounded-sm uppercase border-2 hover:border-black`}
        >
            {children}
        </button>
    );
};

export default Button;
