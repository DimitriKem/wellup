
const styles = require('./HintIcon.less');
const React = require('react');

module.exports = React.createClass({
    propTypes: {
        className: React.PropTypes.string
    },

    render () {
        return (
            <div {...this.props} className={`${styles.hint} ${this.props.className}`}>
            </div>
        );
    }
});