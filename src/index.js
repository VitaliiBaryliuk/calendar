import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.scss'

import configureStore from './store/configureStore'
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = configureStore({})
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
