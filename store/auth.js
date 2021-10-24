export const state = () => ({
    isAuthenticated: false,
    initApplication: false,
    user: null,
})

export const mutations = {
    setAuth(state, payload){
        state.user = {...payload}
        state.isAuthenticated = true
    },
    logOut(state){
        state.isAuthenticated = false
        state.user = null
    },
    init( state ){
        state.initApplication = true
    }
}