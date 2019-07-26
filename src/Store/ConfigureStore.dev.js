
const { createStore, applyMiddleware, compose } = require('redux');
const { persistState } = require('redux-devtools');
const thunkMiddleware = require('@igor/thunk');

const rootReducer = require("./../root-reducer.js");
const {DevTools} = require("./DevToolsContainer.react.js");

const finalCreateStore = compose(
    // Middleware you want to use in development:
    applyMiddleware(thunkMiddleware),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument(),
    // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
    persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey() {
    // You can write custom logic here!
    // By default we try to read the key from ?debug_session=<key> in the address bar
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0)? matches[1] : null;
}

module.exports = function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);

    // Hot reload Reduces (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('./../root-reducer', () =>
            store.replaceReducer(require('./../root-reducer')/*.default if you use Babel 6+ */)
        );
    }

    return store;
};