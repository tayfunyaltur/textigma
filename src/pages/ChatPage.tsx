import { useNavigate, useParams } from "react-router-dom";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import storageUtils from "../utils/storageUtils";

const ChatPage = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState(storageUtils.getRoomById(roomId || ""));
    const navigate = useNavigate();
    useEffect(() => {
        const name = localStorage.getItem("name");
        if (!name) navigate("/");
    }, []);

    useEffect(() => {
        setRoom(storageUtils.getRoomById(roomId || ""));
    }, [roomId]);
    return (
        <div className="min-h-svh flex w-full">
            <Sidebar roomId={roomId} />
            <Chat room={room} />
        </div>
    );
};

export default ChatPage;
