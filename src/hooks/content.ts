import { useState, useEffect } from '/web_modules/preact/hooks.js';
import { getJson } from '../helpers/http-helper.js';

export const useContentDetails = (contentId?: string) => {
    const [content, setContent] = useState({} as any)
    useEffect(() => {
        if (contentId !== undefined)
            getJson('https://api.trakt.tv/movies/' + contentId, { extended: 'full' })
                .then(setContent)
    }, [contentId])
    return [content]
}