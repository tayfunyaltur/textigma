import { useNavigate, useParams } from "react-router-dom";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { Room } from "../types/room.type";
import { useEffect } from "react";

const ChatPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const name = localStorage.getItem("name");
        if (!name) navigate("/");
    }, []);
    const room = JSON.parse(localStorage.getItem("rooms") || "[]").find(
        (room: Room) => room.id === roomId
    );
    return (
        <div className="min-h-screen flex w-full">
            <Sidebar roomId={roomId} />
            <Chat room={room} />
        </div>
    );
};

export default ChatPage;
