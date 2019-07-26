"use strict";

/**
 * @param {object} obj
 * @param {String} prefix
 * @return {object}
 */
module.exports = function(obj, prefix = '') {
    var ret = {};
    var key;
    if (!(obj instanceof Object && !Array.isArray(obj))) {
        throw new Error('keymirror(...): Argument must be an object.');
    }
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            ret[key] = prefix + key;
        }
    }
    return ret;
};