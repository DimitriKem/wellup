

var React = require('react');

module.exports = React.createClass({
    displayName: 'RightArowIcon',

    propTypes: {
        fillClassName: React.PropTypes.any
    },

    render () {
        const {fillClassName} = this.props;
        const props = {...this.props};
        delete props.fillClassName;
        return (
            <svg {...props} width="8px" height="14px" viewBox="0 0 8 14">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
                    <g className={fillClassName} transform="translate(-96.000000, -319.000000)" stroke="#333333">
                        <polyline transform="translate(100.250000, 325.499512) rotate(-90.000000) translate(-100.250000, -325.499512) " points="93.7504883 322.249512 99.9511121 328.749512 106.749512 322.441837"></polyline>
                    </g>
                </g>
            </svg>
        );
    }
});