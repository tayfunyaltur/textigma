import { useParams } from "react-router-dom";
import { Chat } from "../../types/room.type";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";
import Storage from "../../utils/storageUtils";
import Button from "../Button";
import { useContext } from "react";
import { NotificationContext } from "../Toastr";

const Message = ({ chat }: { chat: Chat }) => {
    const { roomId } = useParams();
    const room = Storage.getRoomById(roomId || "");
    const notification = useContext(NotificationContext);
    return (
        <div
            id={chat.id}
            className={[
                "text-white px-2 py-2 rounded-sm w-6/12",
                chat.type === "sent" ? "ml-auto mr-4" : "mr-auto ml-4",
                chat.type === "sent" ? "bg-green" : "bg-blue",
            ].join(" ")}
        >
            <div className="w-full border-b border-white relative pt-6 break-all">
                <div className="absolute top-0 right-0 text-xs">
                    <div className="flex">
                        <span className="mr-2">encrypted</span>
                        <Button
                            size="xs"
                            buttonType={
                                chat.type === "sent" ? "primary" : "secondary"
                            }
                            onClick={() => {
                                window.navigator.clipboard.writeText(
                                    chat.message
                                );
                                notification("Copied to clipboard");
                            }}
                        >
                            copy
                        </Button>
                    </div>
                </div>
                {chat.message}
            </div>
            <div className="w-full relative pb-3">
                <div className="absolute bottom-0 right-0 text-xs">
                    decrypted
                </div>
                {AES.decrypt(chat.message, room?.passcode || "").toString(
                    CryptoJS.enc.Utf8
                )}
            </div>
        </div>
    );
};

export default Message;
