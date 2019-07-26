
const { combineReducers } = require('redux');

const requireAll = requireContext => {
    const req = {};
    requireContext.keys().map((d, i) => {
        d = requireContext(d);
        req[d.name || i] = d.default;
    });
    return req;
};

const reducers = requireAll(require.context('./Reduces', false, /^\.\/.*\.js$/));

const rootReducer = combineReducers(Object.assign({}, reducers));

module.exports = rootReducer;