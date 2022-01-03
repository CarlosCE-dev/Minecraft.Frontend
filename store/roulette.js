export const state = () => ({
    rouletteHistory: []
});

export const mutations = {
    setRouletteHistory( state, payload ){
        state.rouletteHistory = payload;
    },
    addHistory(state, payload) {
        state.rouletteHistory.unshift(payload)
    }
}