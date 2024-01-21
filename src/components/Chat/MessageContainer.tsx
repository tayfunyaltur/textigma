import { Chat } from "../../types/room.type";
import Message from "./Message";

const MessageContainer = ({ messages }: { messages: Chat[] }) => {
    return (
        <div className="w-full flex-1 overflow-auto pt-4" id="mesageContainer">
            <div className="flex-col gap-2 flex justify-end">
                {messages.map((message) => {
                    return <Message key={message.id} chat={message} />;
                })}
            </div>
        </div>
    );
};

export default MessageContainer;
