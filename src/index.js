import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware, ConnectedRouter } from "react-router-redux";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./saga/sagas";

const history = createHistory();
const _routerMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducer, composeEnhancers(applyMiddleware(_routerMiddleware, sagaMiddleware)));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
