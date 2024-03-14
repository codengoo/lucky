import { ReactNode, createContext, useState } from "react";

export interface BankAccount {
    bank: string,
    bank_short: string,
    number: string,
    name: string,
}

export interface BankQRState {
    account: BankAccount,
    wish: string,
    link: string,
    image: string,
}

export type BankQRContextType = {
    state: BankQRState,
    changeAcc: (acc: BankAccount) => void,
    changeWish: (wish: string) => void,
    changeLink: (link: string) => void,
    changeImage: (image: string) => void,
    changeAll: (data: BankQRState) => void,
    reset: () => void
}

export const BankQRContext = createContext<BankQRContextType | null>(null);

const DefaultBankQR: BankQRState = {
    account: {
        bank: "0",
        bank_short: "",
        number: "",
        name: "",
    },
    wish: "",
    link: "",
    image: "images/preview.png",
}

export function BankQRProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<BankQRState>(DefaultBankQR);

    function changeAcc(account: BankAccount) {
        setState({ ...state, account });
    }

    function changeWish(wish: string) {
        setState({ ...state, wish });
    }

    function changeLink(link: string) {
        setState({ ...state, link });
    }

    function changeImage(image: string) {
        setState({ ...state, image });
    }

    function reset() {
        setState(DefaultBankQR);
    }

    function changeAll(data: BankQRState) {
        setState(data);
    }

    return (
        <BankQRContext.Provider value={{
            state, changeAcc, changeImage,
            changeLink, changeWish, reset, changeAll
        }}>
            {children}
        </BankQRContext.Provider>
    )
}