import { getStockPerRarity } from "~/modules/shared/helpers/rarityTypeHelper";

export const state = () => ({
    items: null,
    pageSize: 20,
    pageLoaded: 0,
    totalCount: 0,
    rewardToEdit: null,
    itemsSelected: []
})

export const mutations = {
    init(state, payload){
        state.pageLoaded = 1;
        state.totalCount = payload.meta.total;
        state.items = payload.data;
    },
    addData(state, payload){
        state.items = [...state.items, ...payload.data];
        state.pageLoaded = payload.nextPage;
    },
    new(state, payload){
        if (state.totalCount === state.items.length) {
            state.totalCount = state.totalCount + 1;
            state.items.push(payload);
        }
    },
    toEdit(state, payload){
        state.rewardToEdit = payload;
    },
    update(state, payload){
        const index = state.items.findIndex((item) => item.id === payload.id);
        state.items = [
            ...state.items.slice(0, index),
            payload,
            ...state.items.slice(index + 1)
        ]
    },
    itemSelected(state, payload){
        state.itemsSelected = payload;
    },
}

export const getters = {
    getTotalStock(state){
        if (!state.items || state.itemsSelected.length === 0) return 0;

        return state.items
            .filter(i => state.itemsSelected.includes(i.id))
            .map(i => getStockPerRarity(i.rarity))
            .reduce((prev, next) => prev + next);
    }
}

