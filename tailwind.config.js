/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                black: "#000000",
                green: "#00AA00",
                purple: "#5555FF",
                gray: "#AAAAAA",
                blue: "#00AAAA",
                darkblue: "#0000AA",
            },
            fontFamily: {
                sans: ["DOS", "sans"],
            },
            keyframes: {
                downflow: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "25%": { transform: "translateY(-1.5rem)" },
                    "50%": { transform: "translateY(-3rem)" },
                    "75%": { transform: "translateY(-1.5rem)" },
                    "100%": { transform: "translateY(0)" },
                },
            },
            animation: {
                downflow: "downflow 3s steps(1,end) infinite",
            },
        },
    },
    plugins: [],
};
