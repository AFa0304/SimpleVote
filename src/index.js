import '@babel/polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch} from 'react-router-dom';
import App from './App';
import "./assets/styles/index.less"
import "./assets/styles/animate.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import * as serviceWorker from './serviceWorker';

serviceWorker.unregister();

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <App />
        </Switch>
    </BrowserRouter>
, document.getElementById('root'));
