import { Room, RoomDTO } from "../types/room.type";
import { v4 as uuidv4 } from "uuid";
import messageUtils from "./messageUtils";

const addRoom = (room: RoomDTO) => {
    const rooms = getRooms();
    const newRoom = {
        id: uuidv4(),
        name: room.name,
        passcode: room.passcode,
        chats: [],
    };
    rooms.push(newRoom);
    localStorage.setItem("rooms", JSON.stringify(rooms));
    return newRoom;
};

const getRooms = (): Room[] => {
    const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
    return rooms;
};

const getRoomById = (id: string): Room | undefined => {
    const rooms = getRooms();
    const room = rooms.find((room: Room) => room.id === id);
    return room;
};

const getChatsByRoomId = (roomId: string) => {
    const room = getRoomById(roomId);
    return room?.chats;
};

const addChat = (
    roomId: string,
    message: string,
    type: "sent" | "received"
) => {
    const rooms = getRooms();
    const room = rooms.find((room: Room) => room.id === roomId);
    if (!room) return;
    const newChat = {
        id: uuidv4(),
        message:
            type === "sent"
                ? messageUtils.EncryptMessage(message, room.passcode)
                : message,
        type,
    };
    room?.chats.push(newChat);
    localStorage.setItem("rooms", JSON.stringify(rooms));
    return newChat;
};

const deleteRoom = (id: string) => {
    const rooms = getRooms();
    const newRooms = rooms.filter((room: Room) => room.id !== id);
    localStorage.setItem("rooms", JSON.stringify(newRooms));
};

export default {
    addRoom,
    getRooms,
    getRoomById,
    getChatsByRoomId,
    addChat,
    deleteRoom,
};
