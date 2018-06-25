import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './css/portfolio.css'
import './css/wcfantasy.css'
import androidChrome192 from './img/android-chrome-192x192.png'
import androidChrome512 from './img/android-chrome-512x512.png'
import appleTouch from './img/apple-touch-icon.png'
import favicon16 from './img/favicon-16x16.png'
import favicon32 from './img/favicon-32x32.png'
import favicon from './img/favicon.ico'
import mstile150 from './img/mstile-150x150.png'
import safariPinned from './img/safari-pinned-tab.svg'
import App from './components/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

const store = createStore(reducer, middleware)

if(!document.getElementById('id1')) {
    const link = document.createElement('link');
    link.id = 'id1';
    link.rel = 'apple-touch-icon';
    link.sizes= '180x180'
    link.href = appleTouch;
    document.head.appendChild(link);
}

if(!document.getElementById('id2')) {
    const link = document.createElement('link');
    link.id = 'id2';
    link.rel = 'icon';
    link.sizes= '32x32'
    link.href = favicon32;
    document.head.appendChild(link);
}

if(!document.getElementById('id3')) {
    const link = document.createElement('link');
    link.id = 'id3';
    link.rel = 'icon';
    link.sizes= '16x16'
    link.href = favicon16;
    document.head.appendChild(link);
}

if(!document.getElementById('id4')) {
    const link = document.createElement('link');
    link.id = 'id4';
    link.rel = 'mask-icon';
    link.color = '#5bbad5'
    link.href = safariPinned;
    document.head.appendChild(link);
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
