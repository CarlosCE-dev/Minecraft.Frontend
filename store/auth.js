export const state = () => ({
    isAuthenticated: false,
    initApplication: false,
    user: {},
    role: {
        canEdit: true,
        canCreate: false,
        canView: true
    }
})

export const mutations = {
    setAuth(state, payload){
        state.isAuthenticated = payload;

        // TODO: Store user data
    },
    init( state ){
        state.initApplication = true;
    }
}