import { h, createContext, PreactContext } from '/web_modules/preact.js';
import { useReducer, useContext } from '/web_modules/preact/hooks.js';

interface StoreState {
    content: {
        highlightId?: string;
    }
}

const initialState: StoreState = {
    content: {
        highlightId: undefined
    }
};

export const StateContext: PreactContext<[StoreState, (actions: any) => void]> = createContext([] as any);

function getInitialValue<T>(reducer, state: T) {
    return useReducer(reducer, state)
}
export const GlobalStateProvider = ({ reducer, children }) => (
    <StateContext.Provider value={getInitialValue(reducer, initialState)} >
        {children}
    </StateContext.Provider>
);

export const useGlobalState = () => useContext(StateContext);

const contentReducers = (state, action) => {
    switch (action.type) {
        case 'highlightItem':
            return { ...state, highlightId: action.id }
        default:
            break;
    }
}

export const storeReducers = (state, action) => ({
    content: contentReducers(state, action)
})