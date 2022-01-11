import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from "./Reducers/Index";
import thunk from 'redux-thunk';
import {compose} from "redux";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();
