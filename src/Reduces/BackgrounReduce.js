
const {types} = require('./../Actions/BackgroundActions');

const initialState = {
    backgroundClassName: null,
    fontClassName: null
};

function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.SET_BACKGROUND:
        {
            if (action.backgroundClassName === state.backgroundClassName
                && action.fontClassName === state.fontClassName
                && action.bodyClassName === state.bodyClassName
                && action.schemeClassName === state.schemeClassName
                && action.hour === state.hour
            ) {
                return state;
            }
            return {
                backgroundClassName: action.backgroundClassName,
                fontClassName: action.fontClassName,
                bodyClassName: action.bodyClassName,
                schemeClassName: action.schemeClassName,
                hour: action.hour
            };
        }

        default: {
            return state;
        }
    }
}

module.exports = {
    default: reduce,
    name: 'background'
};