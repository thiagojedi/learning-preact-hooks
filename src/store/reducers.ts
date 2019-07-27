import { Reducer } from "/web_modules/preact/hooks.js";

const contentReducers = (state: StoreContent, action: StoreAction) => {
    switch (action.type) {
        case 'highlightItem':
            return Object.assign({}, state, { highlightId: action.id });
        case 'cacheContent':
            const { details } = state;
            details[action.contentId] = action.overview;
            return Object.assign({}, state, { details });
        default:
            return state;
    }
}

export const storeReducers: Reducer<StoreState, StoreAction> = (state, action) => ({
    content: contentReducers(state.content, action)
})