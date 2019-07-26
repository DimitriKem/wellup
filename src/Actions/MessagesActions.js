
const keyMirror = require('@igor/keymirror');
const Message = require('./../Models/Message');

const types = module.exports = keyMirror({
    ADD: null,
    REMOVE: null
}, 'MESSAGES_ACTIONS_');

/**
 * @method _addMessage
 * @param {Object<Message>} message
 * */
function _addMessage (message) {
    return {
        type: types.ADD,
        message
    };
}

function _removeMessage (id) {
    return {
        type: types.REMOVE,
        id
    };
}

const actions = {

    /**
     * @method addMessage
     * @param {Object<Message>} message
     * */
    addMessage (message) {
        const _id = message.getId();
        return dispatch => {
            const removeMessagePromise = (id, time) => new Promise((_, reject) => setTimeout(() => reject(id), time));
            return new Promise(resolve => setTimeout(resolve, 0))
                .then(() => dispatch(_addMessage(message)))
                .then(() => {
                    // Удаление сообщения спустя отведенное время
                    if (message.getTime()) {
                        return removeMessagePromise(message.getId(), message.getTime());
                    }
                    return Promise.resolve();
                })
                .catch(id => id === _id ? dispatch(_removeMessage(id)) : Promise.reject(id));
        };
    },

    /**
     * @method removeMessage
     * @param {String} id
     * */
    removeMessage (id) {
        return _removeMessage(id);
    }
};

module.exports = {
    types: types,
    actions: actions,
    Message: Message
};