import { GetterTree } from "vuex";
import { AppState, IAccount } from "./state";

export type AppGetter = {
    get_account(state: AppState): IAccount,
    get_wish(state: AppState): string,
    get_password(state: AppState): string
    get_link(state: AppState): string
    get_image(state: AppState): string
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
    get_link(state) {
        return state.link;
    },
    get_image(state) {
        return state.image;
    }
}

export default getters;