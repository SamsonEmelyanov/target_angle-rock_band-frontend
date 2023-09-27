import {applyMiddleware, compose, createStore} from 'redux';
import reducers from './reducers';
import thunk from "redux-thunk";
import log from 'loglevel';

let composeEnhancers

// enable logs & redux only in production.
if (process.env.REACT_APP_ENVIRONMENT === "dev") {

    // by default set the level to info
    log.setLevel("info")
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();
} else {
    console.log = console.error = console.warn = function () {}
    log.disableAll(true)
    composeEnhancers = compose();
}


const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
