

const React = require('react');

module.exports = React.createClass({
    render () {
        return (
            <svg width="17px" height="18px" {...this.props} viewBox="0 0 17 18">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g className="svg-for-stroke" stroke="#333333" strokeWidth="2">
                        <use  mask="url(#bell-icon-path-mask-4)" xlinkHref="#bell-icon-path-closed-3"></use>
                        <use  mask="url(#bell-icon-path-mask-6)" xlinkHref="#bell-icon-path-closed-5"></use>
                    </g>
                </g>
            </svg>
        );
    }
});