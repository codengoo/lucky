import { ReactNode, createContext, useState } from "react";

export interface MessageState {
    template: string,
    message: string,
    password: string,
    link: string
}

export type MessageContextType = {
    state: MessageState
}

export const MessageContext = createContext<MessageContextType | null>(null);

const DefaultMessage: MessageState = {
    template: "images/preview.png",
    message: "",
    password: "",
    link: ""
}

export function MessageProvider({ children }: { children: ReactNode }) {
    const [state] = useState<MessageState>(DefaultMessage);

    return (
        <MessageContext.Provider value={{ state }}>
            {children}
        </MessageContext.Provider>
    )
}