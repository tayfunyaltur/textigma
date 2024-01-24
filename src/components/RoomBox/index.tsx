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
                " border-2 px-2 py-3 font-bold cursor-pointer flex justify-between items-center rounded-sm bg-gray text-black shadow-md shadow-zinc-700",
                isActive && "bg-green !border-green !text-black",
                !isActive && "border-gray ",
                "hover:border-blue hover:text-blue",
            ].join(" ")}
        >
            <span className="text-lg">{roomName}</span>
            {!isPermanent && !isActive && (
                <span
                    className="text-red-800 group"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <span className="opacity-0 group-hover:opacity-100">[</span>
                    Delete
                    <span className="opacity-0 group-hover:opacity-100">]</span>
                </span>
            )}
        </div>
    );
};

export default RoomBox;
