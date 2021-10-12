export const state = () => ({
    isAuthenticated: false,
    initApplication: false,
    user: null,
})

export const mutations = {
    setAuth(state, payload){
        state.isAuthenticated = payload;
        
        // TODO: Store user data
    },
    logOut(state, payload){
        state.isAuthenticated = false;
        state.user = null
    },
    init( state ){
        state.initApplication = true;
    }
}