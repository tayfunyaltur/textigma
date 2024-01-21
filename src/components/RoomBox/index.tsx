interface RoomBoxProps {
    isActive?: boolean;
    roomName: string;
    isPermanent?: boolean;
    onDelete?: () => void;
    onClick?: () => void;
}

const RoomBox = ({
    isActive,
    roomName,
    isPermanent: isPermanent,
    onClick = () => {},
    onDelete = () => {},
}: RoomBoxProps) => {
    return (
        <div
            onClick={onClick}
            className={[
                " border-2 px-2 font-bold cursor-pointer flex justify-between items-center",
                isActive && "border-green text-green",
                !isActive && "border-gray text-gray",
            ].join(" ")}
        >
            <span>{roomName}</span>
            {!isPermanent && !isActive && (
                <span
                    className="text-red-800"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    Delete
                </span>
            )}
        </div>
    );
};

export default RoomBox;
