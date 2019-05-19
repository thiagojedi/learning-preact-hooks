import { useState, useEffect } from '/web_modules/preact/hooks.js';
import { getJson } from '../helpers/http-helper.js';
import { useGlobalState } from '../store/index.js';

export const useContentDetails = (contentId?: string) => {
    const [state, dispatch] = useGlobalState();
    useEffect(() => {
        if (contentId === undefined)
            return

        getJson('https://api.trakt.tv/movies/' + contentId, { extended: 'full' })
            .then(result => {
                dispatch({ type: 'cacheContent', contentId, overview: result });
            })
    }, [contentId]);
    return [state.content.details[contentId!]];
}

export const useTrendingMovies = () => {
    const [trending, setTrending] = useState([] as string[]);
    useEffect(() => {
        getJson('https://api.trakt.tv/movies/trending')
            .then(results => {
                const movieslugs = results.map(result => result.movie.ids.slug);
                setTrending(movieslugs);
            })
    }, [])
    return [trending];
}