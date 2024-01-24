import React, { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext((val: string) => {
    val;
});

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [notification, setNotification] = useState("");
    const addNotification = (message: string) => {
        setNotification(message);
    };

    useEffect(() => {
        if (!notification) return;
        const timer = setTimeout(() => {
            setNotification("");
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [notification]);

    return (
        <NotificationContext.Provider value={addNotification}>
            <div className="absolute top-1/2  left-1/4 right-1/4 max-md:left-10 max-md:right-10 z-20">
                {!!notification && (
                    <div className="bg-green rounded-sm border border-gray px-4 py-2 flex items-center gap-2 justify-between animate-bounce text-white duration-1000">
                        <span className="text-md">{notification}</span>
                        <button
                            onClick={() => {
                                setNotification("");
                            }}
                        >
                            <span className="text-red-800">X</span>
                        </button>
                    </div>
                )}
            </div>
            {children}
        </NotificationContext.Provider>
    );
};

export default Provider;
