import { h } from '/web_modules/preact.js'
import { useContentDetails } from '../../hooks/content.js';
import { useGlobalState } from '../../store/index.js';


export const Highlight = () => {
    const [state] = useGlobalState();
    const contentId = state.content.highlightId;
    
    const defaultContent = { title: '', overview: '' };
    const [contentDetails = defaultContent] = useContentDetails(contentId)

    return (
        <div class="highlight">
            <small>{contentId}</small>
            <h1 class="highlight__title">{contentDetails.title}</h1>
            <p class="highlight__description">{contentDetails.overview}</p>
        </div>
    )
}
