// import 'react-app-polyfill/ie11';
// import 'abortcontroller-polyfill';
import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
