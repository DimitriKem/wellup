
const logger = require('js-logger').get('Touch detect');

module.exports = function () {
    try {
        document.createEvent("TouchEvent");
        logger.debug('Жесты поддерживаются');
        return true;
    } catch (e) {
        logger.debug('Жесты не поддерживаются');
        return false;
    }
};