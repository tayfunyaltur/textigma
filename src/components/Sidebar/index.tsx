import { useEffect, useRef, useState } from "react";
import Header from "../Header";
import RoomBox from "../RoomBox";
import CreateModal from "./CreateModal";
import { Room } from "../../types/room.type";
import DeleteModal from "./DeleteModal";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteRoom, setDeleteRoom] = useState<Room>();
    const [rooms, setRooms] = useState(
        JSON.parse(localStorage.getItem("rooms") || "[]")
    );

    const isListening = useRef(false);
    useEffect(() => {
        if (isListening.current) return;
        addEventListener("storage", () => {
            setRooms(JSON.parse(localStorage.getItem("rooms") || "[]"));
        });
        isListening.current = true;
        return () => {
            removeEventListener("storage", () => {});
        };
    }, []);

    return (
        <div className="bg-darkblue min-h-screen w-3/12">
            <Header />
            <div className="flex flex-col gap-2 px-4 py-4">
                <RoomBox
                    roomName="New chat"
                    isPermanent
                    onClick={() => {
                        setIsOpen(true);
                    }}
                />
                {rooms.map((room: Room) => {
                    return (
                        <RoomBox
                            roomName={room.name}
                            onDelete={() => setDeleteRoom(room)}
                        />
                    );
                })}
            </div>
            <CreateModal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
            />
            <DeleteModal
                isOpen={!!deleteRoom}
                onClose={() => setDeleteRoom(undefined)}
                room={deleteRoom!}
            />
        </div>
    );
};

export default Sidebar;
