export interface IAccount {
    bank: string,
    bank_short: string,
    acc_number: string,
    acc_name: string
}

export interface AppState {
    account: IAccount,
    wish: string,
    password: string,
    link: string,
    image: string,
}

const state: AppState = {
    account: {
        bank: "0",
        acc_name: "",
        acc_number: "",
        bank_short: ""
    },
    password: "",
    wish: "Chúc mừng bạn",
    link: "",
    image: "images/preview.png"
}

export default state;