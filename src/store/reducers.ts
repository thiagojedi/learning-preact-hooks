const contentReducers = (state: { highlightId?: string | undefined; details: any; }, action: { type: string;[key: string]: any }) => {
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

export const storeReducers = (state: StoreState, action: { [key: string]: any; type: string; }) => ({
    content: contentReducers(state.content, action)
})