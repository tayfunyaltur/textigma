import { useEffect, useRef, useState } from "react";
import Header from "../Header";
import RoomBox from "../RoomBox";
import CreateModal from "./CreateModal";
import { Room } from "../../types/room.type";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import Storage from "../../utils/storageUtils";
import Button from "../Button";

const Sidebar = ({ roomId }: { roomId?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [deleteRoom, setDeleteRoom] = useState<Room>();
    const [rooms, setRooms] = useState(
        JSON.parse(localStorage.getItem("rooms") || "[]")
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <>
            <div
                data-open={isSidebarOpen}
                className="hidden max-lg:absolute data-[open=true]:block top-4 left-4 z-10"
            >
                <Button
                    buttonType="secondary"
                    size="xs"
                    onClick={() => {
                        setIsSidebarOpen((prev) => !prev);
                    }}
                >
                    &gt;
                </Button>
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
            <div
                data-open={isSidebarOpen}
                className={[
                    "bg-darkblue min-h-svh w-2/12 border-r border-r-black",
                    "max-lg:block max-lg:absolute max-lg:top-0 max-lg:left-0 max-lg:min-w-60 z-10 data-[open=true]:translate-x-[-20rem] transition-transform duration-500",
                ].join(" ")}
            >
                <div className="flex items-end pr-4">
                    <Header />
                    <div className="hidden max-lg:block">
                        <Button
                            buttonType="secondary"
                            size="xs"
                            onClick={() => {
                                setIsSidebarOpen((prev) => !prev);
                            }}
                        >
                            &lt;
                        </Button>
                    </div>
                </div>
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
            </div>
        </>
    );
};

export default Sidebar;
