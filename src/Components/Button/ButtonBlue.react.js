
const styles = require('./Button.less');

const Button = require('./Button.react');

class ButtonBlue extends Button {
    getClassName() {

        return styles.blueButton;
    }
}

module.exports = ButtonBlue;