import { h, render } from '/web_modules/preact.js'
import { useEffect, useState } from '/web_modules/preact/hooks.js'
import { Highlight } from './components/highlight/index.js'

const contents = ['bumblebee-2018', 'aquaman-2018', 'the-witches-1990']

const App = () => {
    const [index, setindex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => setindex(i => i === contents.length - 1 ? 0 : i + 1), 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div class="container">
            <div class="row">
                <div class="col">
                    <Highlight contentId={contents[index]} />
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