

const keyMirror = require('@igor/keymirror');
const api = require('./../Utils/api');

const types = module.exports = keyMirror({
    UPDATE_DATA: null,
    SET_CURRENT: null
}, 'APPLICATION_');

const actions = {
    /**
     * @method setCurrent
     * @param {String | Number} regime
     * */
    setCurrent(regime) {
        return {
            type: types.SET_CURRENT,
            id: regime
        }
    },

    /**
     * @method getData
     * */
    getData () {
        return dispatch => api.getData()
            .then(response => {
                return dispatch({
                    type: types.UPDATE_DATA,
                    data: response.data
                });
            });
    },

    /**
     * @method setShowHints
     * @param {Boolean} isShow
     * */
    setShowHints(isShow) {
        return dispatch => api.setShowHints(isShow)
            .then(() => api.getData())
            .then(response => {
                return dispatch({
                    type: types.UPDATE_DATA,
                    data: response.data
                });
            })
            .catch()
            .catch(e => {throw e});
    },

    /**
     * @method deleteBlock
     * @param {String | Number} pageId
     * @param {String | Number} blockId
     * */
    deleteBlock(pageId, blockId) {
        return dispatch => api.deleteBlock(pageId, blockId)
            .then(() => api.getData())
            .then(response => {
                return dispatch({
                    type: types.UPDATE_DATA,
                    data: response.data
                });
            })
            .catch()
            .catch(e => {throw e});
    },

    /**
     * @method deleteMessenger
     * @param {String | Number} messengerId
     * */
    deleteMessenger(messengerId) {
        return dispatch => api.deleteMessenger(messengerId)
            .then(() => api.getData())
            .then(response => {
                return dispatch({
                    type: types.UPDATE_DATA,
                    data: response.data
                });
            })
            .catch()
            .catch(e => {throw e});
    },

    /**
     * @method addMessenger
     * @param {String | Number} messengerId
     * */
    addMessenger(messengerId) {
        return (dispatch, getState) => {
            try {
                const state = getState();
                const messengersList = state.application.messengersList;
                const messenger = messengersList.find(m => m.get('id') === messengerId);
                if (messenger && messenger.get('code') === 'telegram') {
                    const re = /href='(.*?)'/g;
                    const link = re.exec(messenger.get('description'))[1];
                    if (link) {
                        window.open(link, '_blank');
                    }
                }
            } catch (e) {
                console.error(e);
            }

            return api.addMessenger(messengerId)
               .then(() => api.getData())
               .then(response => {
                   return dispatch({
                       type: types.UPDATE_DATA,
                       data: response.data
                   });
               })
               .catch()
               .catch(e => {throw e});
        }
    },

    /**
     * @method restoreBlock
     * @param {String | Number} pageId
     * @param {String | Number} blockId
     * */
    restoreBlock(pageId, blockId) {
        return dispatch => api.restoreBlock(pageId, blockId)
            .then(() => api.getData())
            .then(response => {
                return dispatch({
                    type: types.UPDATE_DATA,
                    data: response.data
                });
            })
            .catch()
            .catch(e => {throw e});
    },

    /**
     * @method changePosition
     * @param {String | Number} pageId
     * @param {String | Number} blockId
     * @param {String | Number} position
     * */
    changePosition(pageId, blockId, position) {
        return dispatch => api.changePosition(pageId, blockId, position)
            .then(() => api.getData())
            .then(response => {
                return dispatch({
                    type: types.UPDATE_DATA,
                    data: response.data
                });
            })
            .catch()
            .catch(e => {throw e});
    },

    /**
     * @method resetToWellUp
     * @param {String | Number} pageId
     * */
    resetToWellUp(pageId) {
        return dispatch => api.resetToDefault(pageId)
            .then(() => api.getData())
            .then(response => {
                return dispatch({
                    type: types.UPDATE_DATA,
                    data: response.data
                });
            })
            .catch()
            .catch(e => {throw e});
    },

    /**
     * @method setRepeatsToBlock
     * @param {String | Number} pageId
     * @param {String | Number} blockId
     * @param {Array} repeatsList
     * */
    setRepeatsToBlock (pageId, blockId, repeatsList) {
        return dispatch => api.setRepeatsToBlock(pageId, blockId, repeatsList)
            .then(() => api.getData())
            .then(response => {
                return dispatch({
                    type: types.UPDATE_DATA,
                    data: response.data
                });
            })
            .catch()
            .catch(e => {throw e});
    },

    /**
     * @method setMessengersToBlock
     * @param {String | Number} pageId
     * @param {String | Number} blockId
     * @param {Array} messengersList
     * */
    setMessengersToBlock (pageId, blockId, messengersList) {
        return dispatch => api.setMessengersToBlock(pageId, blockId, messengersList)
            .then(() => api.getData())
            .then(response => {
                return dispatch({
                    type: types.UPDATE_DATA,
                    data: response.data
                });
            })
            .catch()
            .catch(e => {throw e});
    },
};

module.exports = {
    types: types,
    actions: actions
};