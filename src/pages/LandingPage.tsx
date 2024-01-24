import { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import TypingText from "../components/TypingText";
import Constants from "../constants";
import { useNavigate } from "react-router-dom";
import DevModal from "../components/DevModal";

const LandingPage = () => {
    const [val, setVal] = useState("");
    const [error, setError] = useState(false);
    const [hiddenPage, setHiddenPage] = useState(false);

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(
        localStorage.getItem("opened") !== "true"
    );

    return (
        <>
            <DevModal
                isOpen={isOpen}
                onClose={() => {
                    localStorage.setItem("opened", "true");
                    setIsOpen(false);
                }}
            />
            <div className="w-full [&>div>div]:min-h-svh max-h-svh overflow-hidden flex max-lg:flex-col flex-row relative">
                <div
                    data-open={hiddenPage}
                    className="max-lg:data-[open=true]:translate-y-[-100svh] max-lg:transition-all flex max-lg:flex-col w-full"
                >
                    <div className="w-8/12 max-lg:w-full bg-black flex flex-col">
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
                    <div className="w-4/12 max-lg:w-full bg-gray flex flex-col items-center justify-center gap-2">
                        <div className="hidden max-lg:block">
                            <Logo />
                        </div>
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
            </div>
            <div
                data-open={hiddenPage}
                className="absolute hidden max-lg:flex bottom-20 data-[open=true]:translate-y-[-70vh] right-0 left-0  justify-center max-lg:transition-all"
            >
                <Button
                    buttonType="primary"
                    onClick={() => {
                        setHiddenPage((prev) => !prev);
                    }}
                    size="md"
                >
                    {hiddenPage ? "Back" : "Next"}
                </Button>
            </div>
        </>
    );
};

export default LandingPage;
