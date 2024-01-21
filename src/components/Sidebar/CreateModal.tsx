import { useState } from "react";
import TextInput from "../TextInput";
import { v4 as uuidv4 } from "uuid";
import Button from "../Button";

interface createModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateModal = ({ isOpen, onClose }: createModalProps) => {
    const [roomName, setRoomName] = useState("");
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState<string[]>([]);

    return (
        isOpen && (
            <div className="absolute inset-0 bg-transparent flex items-center justify-center">
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
                                const previousRooms =
                                    JSON.parse(
                                        localStorage.getItem("rooms")!
                                    ) || [];
                                localStorage.setItem(
                                    "rooms",
                                    JSON.stringify([
                                        ...previousRooms,
                                        {
                                            id: uuidv4(),
                                            name: roomName,
                                            passcode,
                                        },
                                    ])
                                );
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
