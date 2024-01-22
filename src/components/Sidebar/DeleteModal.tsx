import { Room } from "../../types/room.type";
import Button from "../Button";
import Storage from "../../utils/storageUtils";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    room: Room;
}

const DeleteModal = ({ isOpen, onClose, room }: DeleteModalProps) => {
    return (
        isOpen && (
            <div className="absolute inset-0 bg-transparent flex items-center justify-center z-20">
                <div className="rounded-sm border-2 border-gray px-12 py-4 flex flex-col justify-center items-center bg-darkblue">
                    <span className="text-xl font-bold text-white">
                        <span className="text-red-800">{room.name}</span> will
                        be deleted permanently.
                    </span>
                    <div className="flex gap-4 mt-4">
                        <Button buttonType="primary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            buttonType="secondary"
                            onClick={() => {
                                Storage.deleteRoom(room.id);
                                const event = new Event("storage");
                                dispatchEvent(event);
                                onClose();
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        )
    );
};

export default DeleteModal;
