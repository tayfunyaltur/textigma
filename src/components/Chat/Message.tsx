import { useParams } from "react-router-dom";
import { Chat } from "../../types/room.type";
import Storage from "../../utils/storageUtils";
import Button from "../Button";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../Toastr";
import messageUtils from "../../utils/messageUtils";

const Message = ({ chat }: { chat: Chat }) => {
    const { roomId } = useParams();
    const room = Storage.getRoomById(roomId || "");
    const notification = useContext(NotificationContext);
    const isSent = chat.type === "sent";
    const decryptedSentMessage = messageUtils.DecryptMessage(
        chat.message,
        room?.passcode || ""
    );

    const [encryptedText, setEncryptedText] = useState(
        chat.type === "received" || chat.isEncrypted ? chat.message : ""
    );
    const [decryptedText, setDecryptedText] = useState(
        chat.type === "sent" || chat.isEncrypted ? decryptedSentMessage : ""
    );

    useEffect(() => {
        if (
            !isSent ||
            encryptedText.length === chat.message.length ||
            chat.isEncrypted
        )
            return;
        setTimeout(() => {
            setEncryptedText((prev) => prev + chat.message[prev.length]);
        }, 50);
    }, [isSent, encryptedText]);

    useEffect(() => {
        if (
            isSent ||
            decryptedText.length === decryptedSentMessage.length ||
            chat.isEncrypted
        )
            return;
        setTimeout(() => {
            setDecryptedText(
                (prev: string) => prev + decryptedSentMessage[prev.length]
            );
        }, 50);
    }, [isSent, decryptedText]);

    return (
        <div
            id={chat.id}
            className={[
                "text-white px-2 py-2 rounded-sm w-8/12 max-md:w-10/12 leading-7 shadow-md shadow-zinc-600",
                chat.type === "sent" ? "ml-auto mr-4" : "mr-auto ml-4",
                chat.type === "sent"
                    ? "bg-green text-left"
                    : "bg-blue text-left",
            ].join(" ")}
        >
            <div className="w-full border-b border-white relative pt-6 break-all py-2">
                {/* <span className="mr-2 absolute left-0 top-[-1.25rem] bg-green border-white border px-2 rounded-md text-xs/7 shadow-sm shadow-zinc-700">Encrypted</span> */}
                <div className="absolute top-0 right-0 text-xs">
                    <div className="flex items-center">
                        <Button
                            disabled={
                                !(
                                    isSent ||
                                    decryptedText.length ===
                                        decryptedSentMessage.length ||
                                    chat.isEncrypted
                                ) ||
                                !(
                                    !isSent ||
                                    encryptedText.length ===
                                        chat.message.length ||
                                    chat.isEncrypted
                                )
                            }
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
                {encryptedText}
            </div>
            <div className="w-full relative pb-2 break-all pt-2">
                {/* <div className="absolute bottom-[-1.25rem] left-0 text-xs bg-blue border-white border px-2 rounded-md leading-7 shadow-md shadow-zinc-700">
                    Decrypted
                </div> */}
                {decryptedText}
            </div>
        </div>
    );
};

export default Message;
