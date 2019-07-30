import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import './index.css';
import App from './Containers/App';
import initLangReducer from './store/reducers/initLang';
import authReducer from './store/reducers/auth';
import registerReducer from './store/reducers/register';
import truckRoutesReducer from './store/reducers/truckRoutes';
import {watchInitLang, watchAuth, watchRegister, watchTruckRoutes} from './store/sagas';
import * as serviceWorker from './serviceWorker';

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  initLang: initLangReducer,
  authReducer: authReducer,
  regReducer: registerReducer,
  truckRoutes: truckRoutesReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchInitLang);
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchRegister);
sagaMiddleware.run(watchTruckRoutes);

const app = (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.register();