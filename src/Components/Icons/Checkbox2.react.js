
const React = require('react');

module.exports = React.createClass({
    render () {
        return (
            <svg {...this.props} width="14px" height="14px">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <use stroke="#333333" mask="url(#svg-checkbox-mask-2)" strokeWidth="2" xlinkHref="#svg-checkbox-path-1"></use>
                    
                    {
                        this.props.checked
                            ? <polygon fill="#333333" transform="translate(6.996387, 7.246446) rotate(-270.000000) translate(-6.996387, -7.246446) " points="3.64701171 3.21217022 3.24638691 4.65115196 8.14492366 7.81939061 5.09599323 10.2483501 6.32559969 11.2807213 10.7463869 7.81939061"></polygon>
                            : null
                    }
                </g>
            </svg>
        );
    }
});