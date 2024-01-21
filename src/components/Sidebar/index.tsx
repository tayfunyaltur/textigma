import { useEffect, useRef, useState } from "react";
import Header from "../Header";
import RoomBox from "../RoomBox";
import CreateModal from "./CreateModal";
import { Room } from "../../types/room.type";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import Storage from "../../utils/storageUtils";

const Sidebar = ({ roomId }: { roomId?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [deleteRoom, setDeleteRoom] = useState<Room>();
    const [rooms, setRooms] = useState(
        JSON.parse(localStorage.getItem("rooms") || "[]")
    );

    const isListening = useRef(false);
    useEffect(() => {
        if (isListening.current) return;
        addEventListener("storage", () => {
            setRooms(Storage.getRooms());
        });
        isListening.current = true;
        return () => {
            removeEventListener("storage", () => {});
        };
    }, []);

    return (
        <div className="bg-darkblue min-h-screen w-2/12 border-r border-r-black">
            <Header />
            <div className="flex flex-col gap-2 px-4 py-4">
                <RoomBox
                    key={"newChat"}
                    roomName="New chat"
                    isPermanent
                    onClick={() => {
                        setIsOpen(true);
                    }}
                />
                {rooms.map((room: Room) => {
                    return (
                        <RoomBox
                            key={room.id}
                            isActive={room.id === roomId}
                            roomName={room.name}
                            onDelete={() => setDeleteRoom(room)}
                            onClick={() => navigate(`/${room.id}`)}
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
