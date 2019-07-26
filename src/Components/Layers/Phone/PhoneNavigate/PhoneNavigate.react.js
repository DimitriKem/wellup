
const styles = require('./PhoneNavigate.less');
const React = require('react');

const Navigate = require('./../../../Application/Navigate/Navigate.react');

class PhoneNavigate extends Navigate {
    static displayName = 'PhoneNavigate';

    constructor(props) {
        super(props);

        this.styles = Object.assign({}, this.styles, styles);
    }
}

module.exports = PhoneNavigate;