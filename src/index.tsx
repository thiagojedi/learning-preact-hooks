import { h, render } from '/web_modules/preact.js'
import { useEffect, useState } from '/web_modules/preact/hooks.js'
import { Highlight } from './components/highlight/index.js'

const App = () => {
    const [contentId, setContentId] = useState(269568)

    useEffect(() => {
        setTimeout(() => setContentId(62558), 5000);
    }, [])

    return (
        <div class="container">
            <div class="row">
                <div class="col">
                    <Highlight contentId={contentId} />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    {/* Clocar um carrosel aqui */}
                </div>
            </div>
        </div>
    )
}

render(<App />, document.body)