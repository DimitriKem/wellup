const styles = require('./SetIcon.less');

const React = require('react');

const ActiveIcon = require('./../../../../../Application/MessengersList/MessengerItem/ActiveIcon/ActiveIcon.react');

class SetIcon extends ActiveIcon {
    constructor(props) {
        super(props);

        this.styles = Object.assign({}, styles);
    }
}

module.exports = SetIcon;