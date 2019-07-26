
const {types} = require('./../Actions/PopUpActions');

const popUpState = null;

function popUp(state = popUpState, action = {}) {
    switch (action.type) {
        case types.SHOW:
        {
            return {
                element: action.element,
                content: action.content,
                buttons: action.buttons
            };
        }

        case types.HIDE:
        {
            return null;
        }

        case types.RESIZE:
        {
            return {...state};
        }

        default: {
            return state;
        }
    }
}

module.exports = {
    default: popUp,
    name: 'popUp'
};