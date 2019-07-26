// require('./styles/body.less');
require('babel-polyfill');

/* Входная точка приложения */
const app = require('./app.js');
const webfontloader = require('webfontloader');
const logger = require('js-logger');


// Установка правил логирования
logger.useDefaults();
(process.env.NODE_ENV === 'production')
    ? logger.setLevel(logger.WARN)
    : logger.setLevel(logger.DEBUG);

try {

    /**
     * Загрузка шрифта
     * */
    webfontloader.load({
        google: { families: [ 'Roboto:700,400,300,100:latin,cyrillic' ] },
        timeout: 10000
    });

    /**
     * Start App, точка входа
     * */
    app();
} catch (e) {
    logger.error(e);
}
