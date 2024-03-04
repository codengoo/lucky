import { AppState, IAccount } from './state';
import { MutationTree } from 'vuex';

export enum MutationTypes {
    UPDATE_ACCOUNT = "UPDATE_ACCOUNT",
    UPDATE_WISH = "UPDATE_WISH",
    UPDATE_PASSWORD = "UPDATE_PASSWORD",
}

export type AppMutation<S = AppState> = {
    [MutationTypes.UPDATE_ACCOUNT](state: S, payload: IAccount): void,
    [MutationTypes.UPDATE_WISH](state: S, payload: string): void,
    [MutationTypes.UPDATE_PASSWORD](state: S, payload: string): void,
}

const mutations: MutationTree<AppState> & AppMutation = {
    [MutationTypes.UPDATE_ACCOUNT](state, payload): void {
        state.account = payload
    },
    [MutationTypes.UPDATE_WISH](state, payload): void {
        state.wish = payload
    },
    [MutationTypes.UPDATE_PASSWORD](state, payload): void {
        state.password = payload
    }
}

export default mutations;