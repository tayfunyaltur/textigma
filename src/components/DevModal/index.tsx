import Button from "../Button";

const DevModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    return (
        <div
            data-open={isOpen}
            className="absolute data-[open=false]:hidden inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 max-md:px-4"
        >
            <div className="bg-white opacity-100 rounded-lg p-8 w-[25rem] max-md:w-full text-center">
                We're constantly working on new features! For advices,
                suggestions or bug reports, please contact us at
                <a
                    href="mailto:helloworld@tayfunyaltur.com"
                    className="underline"
                >
                    {" "}
                    helloworld@tayfunyaltur.com
                </a>
                <Button
                    className="mx-auto mt-4"
                    onClick={() => {
                        localStorage.setItem("opened", "true");
                        onClose();
                    }}
                    size="sm"
                >
                    Close
                </Button>
            </div>
        </div>
    );
};

export default DevModal;
