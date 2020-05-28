import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import {Provider} from 'react-redux'
import store from './src/redux/store';
import './src/assets/scss/project.scss';

let root = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    root);
window.store = store;
