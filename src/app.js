const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { Router, Route, hashHistory } = require('react-router');
const logger = require('js-logger');

const configureStore = require('./Store/ConfigureStore');

// Контейнеры
const AppRoute = require('./Routes/AppRoute.react.js');
const RegimeRoute = require('./Routes/RegimeRoute.react.js');

// Мока Request
require('./Utils/requestMock');

module.exports = function () {
    logger.get('Init App').debug('Инициализация приложения');
    const store = configureStore();

    // Строится приложение
    ReactDOM.render(
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route name="App" path="/" component={AppRoute}>
                    <Route name="Regime" path=":regime" component={RegimeRoute} />
                    <Route path="*" component={() => <h1>404</h1>} />
                </Route>
            </Router>
        </Provider>,
        document.querySelector('#app')
    );
};