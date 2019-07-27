type StoreContent = {
    highlightId?: string;
    details: {
        [key: string]: {
            title: string;
            overview: string;
        };
    };
};

interface StoreState {
    content: StoreContent
}

type StoreAction = {
    type: string;
    [key: string]: any;
};