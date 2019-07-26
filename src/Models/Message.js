
/**
 * @class Message
 *
 * @property {String} _id
 * @property {String | Object} _content
 * @property {Array<Object>} _buttons
 * @property {?number} _type
 * @property {?String} _className
 * @property {?Number | boolean} _time
 */
class Message {
    static MESSAGE_TYPE_INFO = 0;
    static MESSAGE_TYPE_SUCCESS = 1;
    static MESSAGE_TYPE_DANGER = 2;
    static MESSAGE_TYPE_ERROR = 3;

    /**
     * @param {String | Object} content Текст сообщения
     * @param {?Number} type Тип сообщения
     * @param {?Number | Boolean} time Время жизни сообщения (false - пока не закроют)
     * */
    constructor (content = '', type = Message.MESSAGE_TYPE_INFO, time = 30000) {
        this._content = content;
        this._id = Message.generateGuid();
        this._time = time;
        this._buttons = [];
        this._type = type;
        this._className = '';
    }

    /**
     * @method setButtons
     * @param {Array} buttons
     * */
    setButtons(buttons) {
        this._buttons = buttons;
    }

    /**
     * @method setClassName
     * @param {String} className
     * */
    setClassName(className) {
        this._className = className;
    }

    /**
     * @method getClassName
     * @returns {String}
     * */
    getClassName () {
        return this._className;
    }

    /**
     * @method getId
     * @returns {String}
     * */
    getId () {
        return this._id;
    }

    /**
     * @method getContent
     * @returns {String | Object}
     * */
    getContent () {
        return this._content;
    }

    /**
     * @method getButtons
     * @returns {Object}
     * */
    getButtons () {
        return this._buttons;
    }

    /**
     * @method getTime
     * @returns {?number}
     * */
    getTime () {
        return this._time;
    }

    /**
     * @method getType
     * @returns {?Number | boolean}
     * */
    getType () {
        return this._type;
    }

    /**
     * @method generateGuid
     * @returns {String}
     * */
    static generateGuid() {
        return Math.floor((1 + Math.random()) * 0x100000000)
            .toString(16)
            .substring(1);
    }
}

module.exports = Message;