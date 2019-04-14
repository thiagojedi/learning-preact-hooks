import { useState, useEffect } from '/web_modules/preact/hooks.js';
import { getJson } from '../helpers/http-helper.js';

export const useContentDetails = (contentId: number | string) => {
    const [content, setContent] = useState({} as any)
    useEffect(() => {
        getJson('https://api.trakt.tv/movies/' + contentId, { extended: 'full' })
            .then(setContent)
    }, [contentId])
    return [content]
}