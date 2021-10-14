export const state = () => ({
    isAuthenticated: false,
    initApplication: false,
    user: null,
})

export const mutations = {
    setAuth(state, payload){
        console.log(payload)
        state.user = {...payload}
        console.log(state.user)
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