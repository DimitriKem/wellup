
const styles = require('./PhonePopUp.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const logger = require('js-logger');

const CloseIcon = require('./../../../Icons/DeleteIcon.react');

class PhonePopUp extends React.Component {
    static displayName = 'PhonePopUp';
    shouldComponentUpdate  = shouldComponentUpdate;
    logger = null;
    eventListener = null;

    static propTypes = {
        popUp: React.PropTypes.shape({
            content: React.PropTypes.any,
            element: React.PropTypes.any
        }),
        closePopUp: React.PropTypes.func.isRequired,
        closePopUpWithoutDeactivate: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.logger = logger.get(PhonePopUp.displayName);
    }

    componentDidMount() {
        this.logger.debug('Did mount');
    }

    componentWillUnmount() {
        this.logger.debug('Will unmount');
        this.props.closePopUpWithoutDeactivate();
        this.removeEventListener();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.popUp) {
            if (!this.eventListener) {
                this.addEventListener();
            }
        } else {
            this.removeEventListener();
        }
    }

    addEventListener() {
        this.logger.debug('Add events');
        this.removeEventListener();
        this.eventListener = true;
        window.addEventListener('keydown', this.keyDown);
    }

    removeEventListener() {
        if (this.eventListener) {
            this.logger.debug('Remove events');
            window.removeEventListener('keydown', this.keyDown);
        }
        this.eventListener = false;
    }

    /**
     * @method keyDown
     * Закрытие попапа после Esc
     * */
    keyDown = (event) => {
        var KEYCODE_ESC = 27;
        if ((event.which || event.keyCode) === KEYCODE_ESC) {
            event.preventDefault();
            event.stopPropagation();
            this.close();
        }
    };

    close = () => {
        this.props.closePopUpWithoutDeactivate();
    };
    
    render () {
        const {popUp} = this.props;
        return (
            <div className={`${styles.popUp} ${popUp ? styles.visible : ''}`} onTouchMove={e => e.preventDefault()}>
                <CloseIcon className={styles.closeIcon} onClick={this.close} />
                <div className={styles.content} onTouchMove={e => e.stopPropagation()}>{popUp ? popUp.content : null}</div>
            </div>
        );
    }
}

module.exports = PhonePopUp;