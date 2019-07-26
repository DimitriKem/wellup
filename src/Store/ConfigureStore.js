

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./ConfigureStore.prod.js');
} else {
    module.exports = require('./ConfigureStore.dev.js');
}