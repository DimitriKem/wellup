
const styles = require('./QuestionIcon.less');
const React = require('react');

module.exports = React.createClass({
    propTypes: {
        className: React.PropTypes.string
    },

    render () {
        return (
            <div {...this.props} className={`${styles.question} ${this.props.className}`}>
            </div>
        );
    }
});