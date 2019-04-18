import { h } from '/web_modules/preact.js';
import { useEffect, useState } from '/web_modules/preact/hooks.js';
import { useGlobalState } from '../store/index.js';

export const Carrosel = ({ contents }) => {
    const [index, setindex] = useState(0);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight')
                setindex(current => current === contents.length - 1 ? 0 : current + 1);
            if (e.key === 'ArrowLeft')
                setindex(current => current === 0 ? contents.length - 1 : current - 1);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [contents]);

    const [, dispatch] = useGlobalState();
    useEffect(() => {
        dispatch({
            type: 'highlightItem',
            id: contents[index]
        });
    }, [index, contents]);

    return (
        <ul class="list-inline">
            {contents.map((contentId, i) =>
                <li class={`list-inline-item ${index === i ? 'text-primary' : ''}`}>
                    {contentId}
                </li>
            )}
        </ul>);
};
