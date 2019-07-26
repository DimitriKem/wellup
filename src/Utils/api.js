
const axios = require('axios');

const get = '/api/ws/get.php';
const payload = '/api/ws/payload.php';
const post = '/api/ws/post.php';

const api = {

	/**
	 * @method getData
	 * */
	getData: function () {
		// var data = axios.post(payload, {
		// 	methodName: 'service.routine:user.get',
		// 	methodParams: {
		// 		userRequired: 'Y'
		// 	}
		// });
		// console.log( data );

		return axios.post(payload, {
			methodName: 'service.routine:user.get',
			methodParams: {
				userRequired: 'Y'
			}
		});
	},

	/**
	 * @method setShowHints
	 * @param {Boolean} isShow
	 * */
	setShowHints: function (isShow) {
		return axios.post(payload, {
			methodName: 'service.routine:user.set.showHints',
			methodParams: {
				userRequired: 'Y',
				isShow: isShow
			}
		})
	},

	/**
	 * @method deleteBlock
	 * @param {String | Number} pageId
	 * @param {String | Number} blockId
	 * */
	deleteBlock: function (pageId, blockId) {
		return axios.post(payload, {
			methodName: 'service.routine:user.set.block.delete',
			methodParams: {
				userRequired: 'Y',
				routineID: pageId,
				blockID: blockId
			}
		})
	},

	/**
	 * @method deleteMessenger
	 * @param {String | Number} messengerId
	 * */
	deleteMessenger: function (messengerId) {
		return axios.post(payload, {
			methodName: 'service.routine:user.set.messenger.delete',
			methodParams: {
				userRequired: 'Y',
				messengerId: messengerId
			}
		})
	},

	/**
	 * @method addMessenger
	 * @param {String | Number} messengerId
	 * */
	addMessenger: function (messengerId) {
		return axios.post(payload, {
			methodName: 'service.routine:user.set.messenger.add',
			methodParams: {
				userRequired: 'Y',
				messengerId: messengerId
			}
		})
	},

	/**
	 * @method restoreBlock
	 * @param {String | Number} pageId
	 * @param {String | Number} blockId
	 * */
	restoreBlock: function (pageId, blockId) {
		return axios.post(payload, {
			methodName: 'service.routine:user.set.block.restore',
			methodParams: {
				userRequired: 'Y',
				routineID: pageId,
				blockID: blockId
			}
		})
	},

	/**
	 * @method changePosition
	 * @param {String | Number} pageId
	 * @param {String | Number} blockId
	 * @param {String | Number} position
	 * */
	changePosition: function (pageId, blockId, position) {
		return axios.post(payload, {
			methodName: 'service.routine:user.set.block.position.update',
			methodParams: {
				userRequired: 'Y',
				routineID: pageId,
				blockID: blockId,
				position: position
			}
		})
	},

	/**
	 * @method resetToDefault
	 * @param {String | Number} pageId
	 * */
	resetToDefault: function (pageId) {
		return axios.post(payload, {
			methodName: 'service.routine:user.set.to.default',
			methodParams: {
				userRequired: 'Y',
				routineID: pageId
			}
		})
	},

	/**
	 * @method setMessengersToBlock
	 * @param {String | Number} pageId
	 * @param {String | Number} blockId
	 * @param {Array} messengersList
	 * */
	setMessengersToBlock: function (pageId, blockId, messengersList) {
		return axios.post(payload, {
			methodName: 'service.routine:user.set.block.messenger',
			methodParams: {
				userRequired: 'Y',
				routineID: pageId,
				blockID: blockId,
				messengerList: messengersList,
				timeBefore: 0
			}
		})
	},


	/**
	 * @method setRepeatsToBlock
	 * @param {String | Number} pageId
	 * @param {String | Number} blockId
	 * @param {Array} repeatsList
	 * */
	setRepeatsToBlock: function (pageId, blockId, repeatsList) {
		return axios.post(payload, {
			methodName: 'service.routine:user.set.block.repeat',
			methodParams: {
				userRequired: 'Y',
				routineID: pageId,
				blockID: blockId,
				repeatList: repeatsList
			}
		})
	}
};

module.exports = api;