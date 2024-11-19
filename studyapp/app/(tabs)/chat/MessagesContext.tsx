import React, { createContext, useContext, useState } from 'react';

type Msg = { sender: string; text: string; timestamp: string };
type MsgRecord = Record<number, Msg[]>;

interface MsgContextProps {
    msgData: MsgRecord;
    setMsgData: React.Dispatch<React.SetStateAction<MsgRecord>>;
}

const MsgContext = createContext<MsgContextProps | undefined>(undefined);

export const MsgProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [msgState, setMsgState] = useState<MsgRecord>({
        1: [
            { sender: 'Tony Stark', text: 'Do you want a shawarma?', timestamp: '2024-11-17T14:30:00Z' },
            { sender: 'You', text: 'No!', timestamp: '2024-11-17T14:32:00Z' },
        ],
        2: [
            { sender: 'Hulk', text: 'smash smash smash', timestamp: '2024-11-17T13:00:00Z' },
        ],
    });

    return (
        <MsgContext.Provider value={{ msgData: msgState, setMsgData: setMsgState }}>
            {children}
        </MsgContext.Provider>
    );
};

export const useMsg = () => {
    const context = useContext(MsgContext);
    if (!context) {
        throw new Error('useMsg must be used within a MsgProvider');
    }
    return context;
};
