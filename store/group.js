export const state = () => ({
    items: [],
    pageSize: 20,
    pageLoaded: 0,
    totalCount: 0,
    groupToEdit: null
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
        state.groupToEdit = payload;
    },
    update(state, payload){
        const index = state.items.findIndex((item) => item.id === payload.id);
        state.items = [
            ...state.items.slice(0, index),
            payload,
            ...state.items.slice(index + 1)
        ]
    }
}

