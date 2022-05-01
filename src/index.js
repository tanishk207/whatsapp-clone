import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';
import { StateProvider } from './utils/StateProvider';
import { reducer, initialState } from './utils/reducer';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <StateProvider reducer={reducer} initialState={initialState}>
          <App />
        </StateProvider>
    </BrowserRouter>
  </React.StrictMode>
  , document.getElementById('root')
)