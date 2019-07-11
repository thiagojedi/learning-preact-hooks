import { h } from '/web_modules/preact.js'
import { useState, useEffect } from '/web_modules/preact/hooks.js'

import { useGlobalState } from '../../store/index.js';
import { getJson } from '../../helpers/http-helper.js';


export const Highlight = () => {
    const [state] = useGlobalState();
    const contentId = state.content.highlightId;

    const [contentDetails, setContent] = useState({ title: '', overview: '' });
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        if (contentId === undefined)
            return
        setLoading(true);
        getJson('https://api.trakt.tv/movies/' + contentId, { extended: 'full' })
            .then((r) => {
                setLoading(false);
                setContent(r);
            });
    }, [contentId]);
    return (
        <div class="highlight">
            <small>{contentId}{isLoading && '-loading...'}</small>
            <h1 class="highlight__title">{contentDetails.title}</h1>
            <p class="highlight__description">{contentDetails.overview}</p>
        </div>
    )
}
