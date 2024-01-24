interface TextInputProps {
    value: string;
    onChange: (val: string) => void;
    onEnter?: (val: string) => void;
    placeholder?: string;
    error?: boolean;
    className?: string;
    type?: "text" | "password" | "textarea";
}

const TextInput = ({
    value,
    onChange,
    placeholder,
    error,
    type = "text",
    className,
    onEnter,
}: TextInputProps) => {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            type={type}
            onKeyDown={(e) => {
                onEnter && e.key === "Enter" && onEnter(value);
            }}
            className={[
                "[&::placeholder]:text-black px-2 bg-transparent border-2 border-black focus-visible:outline-0 focus-visible:border-black focus-within:ring-2 focus-within:ring-blue focus:bg-blue break-all shadow-md shadow-zinc-700",
                className,
                error && "!border-red-800",
            ].join(" ")}
        />
    );
};

export default TextInput;
