const texts = ["Text", "#$%^", "Text"];

const Logo = () => (
    <div className="font-DOS flex rounded-sm overflow-hidden w-fit">
        <div className="overflow-hidden max-h-[1.47rem]">
            <div className=" animate-downflow">
                {texts.map((text, index) =>
                    text === "Text" ? (
                        <div
                            key={index}
                            className="bg-green text-white pl-2  pr-0.5"
                        >
                            {text}
                        </div>
                    ) : (
                        <div
                            key={index}
                            className="bg-red-800 pl-2 text-gray  pr-0.5"
                        >
                            {text}
                        </div>
                    )
                )}
            </div>
        </div>
        <span className="  max-h-[1.5rem] bg-gray text-white pr-2 pl-0.5">
            igma
        </span>
    </div>
);

export default Logo;
