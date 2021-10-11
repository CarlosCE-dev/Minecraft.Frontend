export const state = () => ({
    mobil: false,
    size: 0,
    pageTitle: "Home"
});

export const mutations = {
    isMobil( state, payload ){
        state.mobil = payload;
    },
    setPageTitle(state, title) {
        state.pageTitle = title
    }
}