import { h, render } from '/web_modules/preact.js'
import { useState } from '/web_modules/preact/hooks.js'
import { Highlight } from './components/highlight/index.js'
import { GlobalStateProvider } from './store/index.js';
import { storeReducers } from './store/reducers.js';
import { Carrosel } from './components/carrosel.js';

const App = () => {
    const [contents] = useState(['bumblebee-2018', 'aquaman-2018', 'the-witches-1990']);

    return (
        <GlobalStateProvider reducers={storeReducers}>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <Highlight />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <Carrosel contents={contents} />
                    </div>
                </div>
            </div>
        </GlobalStateProvider>
    )
}

render(<App />, document.body);