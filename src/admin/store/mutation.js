const mutations = {
    update_account: (state, payload) => {
        state.account = payload
    },
    update_wish: (state, payload) => {
        state.wish = payload
    },
    update_password: (state, payload) => {
        state.password = payload
    },
}

export default mutations;