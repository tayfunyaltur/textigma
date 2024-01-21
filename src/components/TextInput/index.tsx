interface TextInputProps {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    error?: boolean;
    className?: string;
    type?: "text" | "password";
}

const TextInput = ({
    value,
    onChange,
    placeholder,
    error,
    type = "text",
    className,
}: TextInputProps) => {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            type={type}
            className={[
                "[&::placeholder]:text-black px-2 bg-transparent border-2 border-black focus-visible:outline-0 focus-visible:border-black focus-within:ring-2 focus-within:ring-blue focus:bg-blue",
                className,
                error && "!border-red-800",
            ].join(" ")}
        />
    );
};

export default TextInput;
