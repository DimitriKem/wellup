
const styles = require('./CategoryIcon.less');
const React = require('react');

module.exports = React.createClass({
    propTypes: {
        className: React.PropTypes.string
    },
    
    render () {
        const {color, className} = this.props;

        return (
            <div {...this.props} className={`${styles.wrapper} ${className}`}>
                <div className={styles.icon} style={{backgroundColor: color}}></div>
            </div>
        );
    }
});