import { useEffect, useState } from "react";
import { Chat as ChatType, Room } from "../../types/room.type";
import Button from "../Button";
import TextInput from "../TextInput";
import MessageContainer from "./MessageContainer";
import Storage from "../../utils/storageUtils";

interface ChatProps {
    room?: Room;
}

const Chat = ({ room }: ChatProps) => {
    const [messages, setMessages] = useState<ChatType[]>(room?.chats || []);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessages(room?.chats || []);
    }, [room]);

    useEffect(() => {
        if (!room) return;
        const newMessage = document.getElementById(
            messages[messages.length - 1]?.id
        );
        const messageContainer = document.getElementById("messageContainer");

        messageContainer?.scrollTo({
            top: (newMessage?.offsetTop || 0) - 550,
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <div className="min-h-screen max-h-screen w-10/12 bg-gray relative flex flex-col overflow-hidden">
            {!!room && (
                <div className="w-full bg-blue px-2 py-2 text-xl border-b border-b-black">
                    {room?.name}
                </div>
            )}
            {!room && (
                <div className="absolute inset-0 flex items-center justify-center text-2xl text-white">
                    Select or create a room to start chatting.
                </div>
            )}
            {!!room && <MessageContainer messages={messages} />}
            {!!room && (
                <div className="flex my-4 mx-4 gap-2">
                    <TextInput
                        value={message}
                        onChange={(val) => {
                            setMessage(val);
                        }}
                        className="w-full"
                        placeholder="Type Your Message"
                    />
                    <Button
                        disabled={message.trim() === ""}
                        onClick={() => {
                            Storage.addChat(room?.id || "", message, "sent");
                            setMessages(
                                Storage.getRoomById(room?.id || "")?.chats || []
                            );
                            setMessage("");
                        }}
                        buttonType="secondary"
                        size="sm"
                    >
                        Encrypt
                    </Button>
                    <Button
                        disabled={message.trim() === ""}
                        onClick={() => {
                            Storage.addChat(
                                room?.id || "",
                                message,
                                "received"
                            );
                            setMessages(
                                Storage.getRoomById(room?.id || "")?.chats || []
                            );
                            setMessage("");
                        }}
                        buttonType="primary"
                        size="sm"
                    >
                        Decrypt
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Chat;
