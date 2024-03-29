import { ReactNode, createContext, useState } from "react";

export interface MessageState {
    from: string;
    to: string;
    message: string;
    image: string;
    link: string;
    password: string;
    store: string;
}

export type MessageContextType = {
    state: MessageState,
    reset: () => void
    changeAll: (data: MessageState) => void,
    changeFrom: (data: string) => void,
    changeTo: (data: string) => void,
    changeMessage: (data: string) => void,
    changeImage: (data: string) => void,
    changeLink: (data: string) => void,
    changePassword: (data: string) => void,
    changeStore: (data: string) => void
}

export const MessageContext = createContext<MessageContextType | null>(null);

const DefaultMessage: MessageState = {
    from: "",
    to: "",
    message: "",
    image: "images/preview.png",
    link: "",
    password: "",
    store: "",
}

export function MessageProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<MessageState>(DefaultMessage);

    function reset() {
        setState(DefaultMessage);
    }

    function changeAll(data: MessageState) {
        setState(data);
    }

    function changeFrom(data: string) {
        setState({ ...state, from: data });
    }

    function changeTo(data: string) {
        setState({ ...state, to: data });
    }

    function changeMessage(data: string) {
        setState({ ...state, message: data });
    }

    function changeImage(data: string) {
        setState({ ...state, image: data });
    }

    function changeLink(data: string) {
        setState({ ...state, link: data });
    }

    function changePassword(data: string) {
        setState({...state, password: data });
    }

    function changeStore(data: string) {
        setState({...state, store: data });
    }

    return (
        <MessageContext.Provider value={{
            state, changeImage, changeFrom,
            changeTo, changeMessage, changeLink,
            changePassword, changeStore,
            reset, changeAll
        }}>
            {children}
        </MessageContext.Provider>
    )
}