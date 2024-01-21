import { useEffect, useState } from "react";
import { Chat as ChatType, Room } from "../../types/room.type";
import Button from "../Button";
import TextInput from "../TextInput";
import MessageContainer from "./MessageContainer";
import { v4 as uuidv4 } from "uuid";

interface ChatProps {
    room?: Room;
}

const Chat = ({ room }: ChatProps) => {
    const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
    const _room = rooms.find((_room: Room) => _room.id === room?.id);
    const [messages, setMessages] = useState<ChatType[]>(_room?.chats || []);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!_room) return;
        localStorage.setItem(
            "rooms",
            JSON.stringify(
                rooms.map((r: Room) => {
                    if (r.id === room?.id) {
                        return {
                            ...r,
                            chats: messages,
                        };
                    }
                    return r;
                })
            )
        );
        const newMessage = document.getElementById(
            messages[messages.length - 1].id
        );
        const messageContainer = document.getElementById("mesageContainer");

        messageContainer?.scrollTo({
            top: (newMessage?.offsetTop || 0) - 550,
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <div className="min-h-screen max-h-screen w-9/12 bg-gray relative flex flex-col overflow-hidden">
            {!!room && (
                <div className="w-full bg-blue px-2 py-2 text-xl">
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
                        onClick={() => {
                            const newMessages = [...messages];
                            newMessages.push({
                                message: message,
                                id: uuidv4(),
                                type: "sent",
                            });
                            setMessages(newMessages);
                            setMessage("");
                        }}
                        buttonType="secondary"
                        size="sm"
                    >
                        Encrypt
                    </Button>
                    <Button
                        onClick={() => {
                            const newMessages = [...messages];
                            newMessages.push({
                                message: message,
                                id: uuidv4(),
                                type: "received",
                            });
                            setMessages(newMessages);
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
