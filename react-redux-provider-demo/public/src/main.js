import React from 'react';
import ReactDom from 'react-dom';
import Provider from './containers/Provider';
import {createStore} from 'redux';
import reducer from './reducers/index.js';
import App from './containers/App.js';

let store = createStore(reducer);
console.log(store, 'store') // createStore是redux 本身的实现API
// 现在我们的问题是如何使用react-redex进行连接的API, Provider 和connectw

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);