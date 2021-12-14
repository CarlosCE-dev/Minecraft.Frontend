import { RoleTypes, validAdminRoles } from "~/models/enums/RoleTypes"

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

export const getters = {
    isAdmin: ( state ) =>  state.user.role === RoleTypes.admin,
    isAdminOrModerator: ( state ) =>  validAdminRoles.includes(state.user.role)
}