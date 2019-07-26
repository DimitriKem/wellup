
const {types} = require('./../Actions/MessagesActions');

const initialState = {
    list: new Map()
};

function messages(state = initialState, action = {}) {
    switch (action.type) {
        case types.ADD:
        {
            const {message} = action;
            return {list:  new Map().set(message.getId(), message)};
        }

        case types.REMOVE:
        {
            if (state.list.has(action.id)) {
                return {list:  new Map()};
            }

            return state;
        }

        default: {
            return state;
        }
    }
}

module.exports = {
    default: messages,
    name: 'messages'
};