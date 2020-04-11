import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DB, { DbContext } from './commons/DB';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter>
        <DbContext.Provider value={new DB()}>
              <App />
        </DbContext.Provider>
    </BrowserRouter>,
    document.getElementById('root')
)
