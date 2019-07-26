

const keyMirror = require('@igor/keymirror');

const types = module.exports = keyMirror({
    SET: null,
    RESET: null
}, 'ACTIVE_ITEM_');

const actions = {
    /**
     * @method setActiveItem
     * @param {String | Number} activeItem
     * */
    setActiveItem (activeItem) {
        // Делается асинхронный, чтобы успеть закрыть предыдущий
        return dispatch => setTimeout(() => dispatch({
            type: types.SET,
            activeItem: activeItem
        }), 0);
    },

    /**
     * @method hidePopUp
     * */
    reset () {
        return {
            type: types.RESET
        };
    }
};

module.exports = {
    types: types,
    actions: actions
};