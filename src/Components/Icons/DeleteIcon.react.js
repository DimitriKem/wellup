
const React = require('react');

module.exports = React.createClass({
    render () {
        return (
            <svg width="10" height="10" {...this.props} viewBox="0 0 10 10">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-95.000000, -291.000000)" fill="#333333">
                        <polygon points="95.670746 291 95 291.670746 99.329254 296 95 300.329254 95.670746 301 100 296.670746 104.329254 301 105 300.329254 100.670746 296 105 291.670746 104.329254 291 100 295.329254"></polygon>
                    </g>
                </g>
            </svg>
        );
    }
});