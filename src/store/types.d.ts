interface StoreState {
    content: {
        highlightId?: string;
        details: {
            [key: string]: { title: string, overview: string }
        }
    }
}