
const keyMirror = require('@igor/keymirror');

const types = keyMirror({
    SET_BACKGROUND: null
}, 'BACKGROUND_ACTIONS_');

const actions = {
  setBackground (backgroundClassName, fontClassName, bodyClassName, schemeClassName, hour) {
      return {
          type: types.SET_BACKGROUND,
          backgroundClassName,
          fontClassName,
          bodyClassName,
          schemeClassName,
          hour
      }
  }
};

module.exports = {types, actions};