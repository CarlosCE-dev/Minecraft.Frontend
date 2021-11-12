export const state = () => ({
    snackbar: { color: 'orange', timeout: 3000, state: false , text: 'Porfavor de rellenar todos los campos requeridos', top: true },
    loader: false,
    alert: { state: false, title: "", message: "" }
});

export const mutations = {
    loader( state, payload ){
        state.loader = payload;
    },
    snackbar( state, payload ){
        state.snackbar = payload;
    },
    alert( state, payload ){
        state.alert = payload;
    },
}

export const getters = {
    getLoader: ( state ) => state.loader,
    getSnackbar: ( state ) => state.snackbar,
    getAlert: ( state ) => state.alert,
}