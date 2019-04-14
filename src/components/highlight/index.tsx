import { h } from '/web_modules/preact.js'
import { useContentDetails } from '../../hooks/content.js';

interface HighlightProps {
    contentId: number | string
}

export const Highlight = ({ contentId }: HighlightProps) => {
    const [content] = useContentDetails(contentId)

    return (
        <div class="highlight">
            <h1 class="highlight__title">{content.title}</h1>
            <p class="highlight__description">{content.overview}</p>
        </div>
    )
}
