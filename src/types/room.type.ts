export interface Room {
    id: string;
    name: string;
    passcode: string;
    chats: Chat[];
}

export interface Chat {
    id: string;
    message: string;
    type: "sent" | "received";
    isEncrypted?: boolean;
}

export interface RoomDTO {
    name: string;
    passcode: string;
}
