import React, { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext((val: string) => {});

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [notification, setNotification] = useState("");
    const addNotification = (message: string) => {
        setNotification(message);
    };

    useEffect(() => {
        if (!notification) return;
        const timer = setTimeout(() => {
            setNotification("");
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [notification]);

    return (
        <NotificationContext.Provider value={addNotification}>
            <div className="absolute top-5 right-5 z-20">
                {!!notification && (
                    <div className="bg-green rounded-sm border border-gray px-4 py-2 flex items-center gap-2 justify-between text-white animate-bounce duration-500">
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
