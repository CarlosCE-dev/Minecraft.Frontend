import { getStockPerRarity } from "~/modules/shared/helpers/rarityTypeHelper";

export const state = () => ({
    items: null,
    pageSize: 20,
    pageLoaded: 0,
    totalCount: 0,
    rewardToEdit: null,
    itemsSelected: [],
    isClaimPage: false,
    detailEventId: 0
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
    remove(state, payload){
        const i = state.items.map(item => item.id).indexOf(payload);
        state.items.splice(i, 1);
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
    setClaimPage(state, payload){
        state.isClaimPage = payload
    },
    setDetailEvent(state, payload){
        state.detailEventId = payload
    }
}

export const getters = {
    getTotalStock(state){
        if (!state.items || state.itemsSelected.length === 0) return 0;

        const items = state.items
            .filter(i => state.itemsSelected.includes(i.id))
            .map(i => getStockPerRarity(i.rarity));

        return items.length > 0 ? items.reduce((prev, next) => prev + next) : 0;
    }
}

