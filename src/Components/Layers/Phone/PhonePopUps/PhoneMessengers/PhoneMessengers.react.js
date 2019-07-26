
const styles = require('./PhoneMessengers.less');

const React = require('react');

const Messengers = require('./../../../../Application/PopUps/Messengers/Messengers.react');

class PopUpMessengers extends Messengers {
    render () {
        return super.render(styles);
    }
}

module.exports = PopUpMessengers;