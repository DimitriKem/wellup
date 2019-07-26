const styles = require('./ActiveIcon.less');

const React = require('react');

//const DeleteIcon = require('./../../../Icons/DeleteIcon.react');

class ActiveIcon extends React.PureComponent {
    static displayName = 'ActiveIcon';

    constructor(props) {
        super(props);

        this.styles = styles;
    }

    static propTypes = {
        active: React.PropTypes.bool.isRequired,
        onChange: React.PropTypes.func.isRequired,
    };

    onClick = () => {
        const {onChange, active} = this.props;
        onChange(!active);
    };
    
    render() {
        const {active} = this.props;

        let className = this.styles.icon + ' ';

        className += active ? this.styles.active : this.styles.deactive;
        
        return (
            <div className={className} onClick={this.onClick}>
                <svg className={this.styles.svg} width="16px" height="16px">
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="scale(1.2, 1.2)">
                        <polygon className={this.styles.fill} transform="translate(6.996387, 7.246446) rotate(-270.000000) translate(-6.996387, -7.246446) " points="3.64701171 3.21217022 3.24638691 4.65115196 8.14492366 7.81939061 5.09599323 10.2483501 6.32559969 11.2807213 10.7463869 7.81939061"></polygon>
                    </g>
                </svg>
            </div>
        )
    }
}

module.exports = ActiveIcon;