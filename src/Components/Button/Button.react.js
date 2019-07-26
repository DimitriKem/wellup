
const styles = require('./Button.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');

class Button extends React.Component {
    static displayName = 'Button';
    shouldComponentUpdate  = shouldComponentUpdate;

    static propTypes = {
        className: React.PropTypes.string,
        text: React.PropTypes.string.isRequired
    };

    getClassName() {
        return styles.button;
    }

    render () {
        const {className, text} = this.props;
        const props = {...this.props};
        delete props.text;

        return (
            <button {...props} className={`${this.getClassName()} ${className}`}>
                {text}
            </button>
        )
    }
}
module.exports = Button;