
const { createStore, applyMiddleware, compose } = require('redux');
const rootReducer = require('./../root-reducer.js');
const thunkMiddleware = require('@igor/thunk');

const finalCreateStore = compose(
    // Middleware you want to use in production:
    applyMiddleware(thunkMiddleware)
    // Other Store enhancers if you use any
)(createStore);

module.exports = function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
};