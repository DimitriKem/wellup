
const keyMirror = require('@igor/keymirror');
const ActiveIconActions = require('./ActiveItemActions').actions;

const types = module.exports = keyMirror({
    SHOW: null,
    HIDE: null,
    RESIZE: null
}, 'POPUP_ACTIONS_');

const actions = {
    /**
     * @method showPopUp
     * @param {?Element} element
     * @param {String | Object} content
     * @param {?Array<Element>} buttons
     * */
    showPopUp (content, element, buttons = []) {
        // Делается асинхронный, чтобы успеть закрыть предыдущий popup
        return dispatch => setTimeout(() => {
            dispatch({
                type: types.SHOW,
                element: element,
                content: content,
                buttons: buttons
            });
        }, 0);
    },

    /**
     * @method hidePopUp
     * */
    hidePopUpWithDeactivate () {
        return dispatch => {
            dispatch({
                type: types.HIDE
            });

            dispatch(ActiveIconActions.reset());
        }
    },

    /**
     * @method hidePopUp
     * */
    hidePopUp () {
        return {
            type: types.HIDE
        };
    },

    /**
     * @method resize
     * */
    resize () {
        return {
            type: types.RESIZE
        };
    }
};

module.exports = {
    types: types,
    actions: actions
};