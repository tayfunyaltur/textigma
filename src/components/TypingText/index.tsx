import React, { useRef } from "react";

interface TypingTextProps {
    text: string[];
    className: string;
}

const TypingText = ({ text, className }: TypingTextProps) => {
    const [displayed, setDisplayed] = React.useState<string>("");
    const index = useRef(0);
    const textIndex = useRef(0);
    const direction = useRef(1);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (index.current > 0) {
                setDisplayed(text[textIndex.current].slice(0, index.current));
            } else {
                setDisplayed("");
            }

            if (direction.current === 1) {
                index.current++;
            } else {
                index.current--;
            }

            if (index.current === 0) {
                direction.current = 1;
                if (textIndex.current === text.length - 1) {
                    textIndex.current = 0;
                } else {
                    textIndex.current++;
                }
            } else if (index.current === text[textIndex.current].length) {
                direction.current = 0;
            }
        }, 75);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`${className}`}>
            {displayed}
        </div>
    );
};

export default TypingText;
