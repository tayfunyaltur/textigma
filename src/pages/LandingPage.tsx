import { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import TypingText from "../components/TypingText";
import Constants from "../constants";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [val, setVal] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    return (
        <div className="w-full [&>div]:min-h-screen flex">
            <div className="w-8/12 bg-black flex flex-col">
                <Header />
                <div className="flex-1 px-4 flex flex-col items-center justify-center">
                    <div className="text-green flex items-center justify-center gap-2">
                        <span className="text-2xl">Welcome to </span>
                        <Logo />
                    </div>
                    <TypingText
                        className=" text-xl border-green border text-green mt-8 p-4 min-h-[10rem] w-full"
                        text={Constants.WelcomeMessages}
                    />
                </div>
            </div>
            <div className="w-4/12 bg-gray flex flex-col items-center justify-center gap-2">
                <div className="text-center px-4 text-lg">
                    We need your name before start to journey with us.
                </div>
                <TextInput
                    value={val}
                    onChange={(val) => {
                        setVal(val);
                        setError(false);
                    }}
                    error={error}
                    placeholder="John Doe"
                />
                <Button
                    onClick={() => {
                        if (val.length < 3) {
                            setError(true);
                            return;
                        }
                        localStorage.setItem("name", val);
                        navigate("chat");
                    }}
                    buttonType="secondary"
                >
                    Get Secured
                </Button>
            </div>
        </div>
    );
};

export default LandingPage;
