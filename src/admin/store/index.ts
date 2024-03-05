import { CommitOptions, createStore, DispatchOptions, Store as VuexStore } from "vuex"
import mutations, { AppMutation } from "./mutation"
import actions, { AppAction } from "./action"
import getters, { AppGetter } from "./getter";
import state, { AppState } from "./state";

const store = createStore({
    state,
    mutations,
    actions,
    getters
})

export default store;

export type Store = Omit<
VuexStore<AppState>,
    'getters' | 'commit' | 'dispatch'
> & {
    commit<K extends keyof AppMutation, P extends Parameters<AppMutation[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<AppMutation[K]>
} & {
    dispatch<K extends keyof AppAction>(
        key: K,
        payload: Parameters<AppAction[K]>[1],
        options?: DispatchOptions
    ): ReturnType<AppAction[K]>
} & {
    getters: {
        [K in keyof AppGetter]: ReturnType<AppGetter[K]>
    }
}