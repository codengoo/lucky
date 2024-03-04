import { createStore } from "vuex"
import mutations from "./mutation"
import actions from "./action"
import getters from "./getter";
import state from "./state";

const store = createStore({
    state,
    mutations,
    actions,
    getters
})

export default store;