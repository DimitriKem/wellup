
const {types} = require('./../Actions/ActiveItemActions');

const initialState = null;

function activeItem(state = initialState, action = {}) {
    switch (action.type) {
        case types.SET:
        {
            return action.activeItem;
        }

        case types.RESET:
        {
            return null;
        }

        default: {
            return state;
        }
    }
}

module.exports = {
    default: activeItem,
    name: 'activeItem'
};