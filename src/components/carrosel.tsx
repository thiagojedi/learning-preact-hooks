import { h } from '/web_modules/preact.js';
import { useEffect, useState } from '/web_modules/preact/hooks.js';
import { useGlobalState } from '../store/index.js';

type CarroselProps = { contents: string[] }

export const Carrosel = ({ contents }: CarroselProps) => {
    const [index, setindex] = useState(0);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowRight':
                    setindex(current => current === contents.length - 1 ? 0 : current + 1);
                    break;
                case 'ArrowLeft':
                    setindex(current => current === 0 ? contents.length - 1 : current - 1);
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown); //Remove listener on unmount
    }, [contents]);

    const [, dispatch] = useGlobalState();
    useEffect(() => dispatch({ type: 'highlightItem', id: contents[index] }), [index, contents]);

    return (
        <ul class="list-inline">
            {contents.map((contentId, i) =>
                <li class={`list-inline-item ${index === i && 'text-primary'}`}>
                    {contentId}
                </li>
            )}
        </ul>);
};
