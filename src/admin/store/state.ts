export interface IAccount {
    bank: string,
    acc_number: string,
    acc_name: string
}

export interface AppState {
    account: IAccount,
    wish: string,
    password: string,
    link: string
}

const state: AppState = {
    account: {
        bank: "0",
        acc_name: "",
        acc_number: "0",
    },
    password: "",
    wish: "Chúc mừng bạn",
    link: ""
}

export default state;