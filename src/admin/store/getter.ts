import { GetterTree } from "vuex";
import { AppState, IAccount } from "./state";

export type AppGetter = {
    get_account(state: AppState): IAccount,
    get_wish(state: AppState): string,
    get_password(state: AppState): string
}


const getters: GetterTree<AppState, AppState> & AppGetter = {
    get_account(state): IAccount {
        return state.account;
    },
    get_wish(state): string {
        return state.wish;
    },
    get_password(state): string {
        return state.password;
    },
}

export default getters;