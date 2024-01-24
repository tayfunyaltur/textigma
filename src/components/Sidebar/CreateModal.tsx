import { useEffect, useState } from "react";
import TextInput from "../TextInput";
import Button from "../Button";
import Storage from "../../utils/storageUtils";
import { useNavigate } from "react-router-dom";

interface createModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateModal = ({ isOpen, onClose }: createModalProps) => {
    const [roomName, setRoomName] = useState("");
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setRoomName("");
        setPasscode("");
        setError([]);
    }, [isOpen]);

    return (
        isOpen && (
            <div className="absolute inset-0 bg-transparent flex items-center justify-center z-20">
                <div className="rounded-sm border-2 border-gray px-12 py-4 flex flex-col justify-center items-center bg-darkblue">
                    <span className="text-xl font-bold text-white">
                        Create Room
                    </span>
                    <div className="w-full flex flex-col justify-center items-center mt-4 gap-4">
                        <TextInput
                            placeholder="Room name"
                            onChange={(val) => {
                                setRoomName(val);
                                setError(error.filter((e) => e !== "roomname"));
                            }}
                            error={error.includes("roomname")}
                            value={roomName}
                            className="border-white text-white [&::placeholder]:text-white"
                        />
                        <TextInput
                            placeholder="Passcode"
                            onChange={(val) => {
                                setPasscode(val);
                                setError(error.filter((e) => e !== "passcode"));
                            }}
                            error={error.includes("passcode")}
                            value={passcode}
                            type="password"
                            className="border-white text-white [&::placeholder]:text-white"
                        />
                    </div>
                    <div className="w-full flex justify-center items-center mt-4 gap-4">
                        <Button
                            onClick={() => {
                                onClose();
                            }}
                            buttonType="secondary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                const errors = [];
                                if (!roomName || !passcode) {
                                    if (!roomName) {
                                        errors.push("roomname");
                                    }
                                    if (!passcode) {
                                        errors.push("passcode");
                                    }
                                    setError(errors);
                                    return;
                                }
                                const newRoom = Storage.addRoom({
                                    name: roomName,
                                    passcode,
                                });
                                navigate(`/${newRoom.id}`);
                                const event = new Event("storage");
                                dispatchEvent(event);
                                onClose();
                            }}
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </div>
        )
    );
};

export default CreateModal;
