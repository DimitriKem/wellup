

const styles = require('./PopUp.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const logger = require('js-logger');

const CloseIcon = require('./../../Icons/DeleteIcon.react');

const TIME_COUNT = 50;  //мс, интервал пересчета позиции
const ARROW_HEIGHT = 8;


/**
 * @class PopUp
 * @extends React.Component
 * Компонент для отображения и позиционирования на странице попапа
 * Попап позиционирован как fixed
 * */
class PopUp extends React.Component {
    static displayName = 'PopUp';
    shouldComponentUpdate  = shouldComponentUpdate;
    logger = null;
    eventListener = null;
    resizeTimeout = null;

    constructor(props) {
        super(props);

        this.logger = logger.get(PopUp.displayName);
        this.state = {positionContainer: null, positionArrow: null, arrowClass: null};
    }

    static propTypes = {
        popUp: React.PropTypes.shape({
            // Содержимое попапа, может быть Компонентом или строкой
            content: React.PropTypes.any,
            // Элемент, к которому прикрепляется попап
            element: React.PropTypes.any
        }),
        // Функция закрытия попапа
        closePopUp: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        this.logger.debug('Did mount');
    }

    componentWillUnmount() {
        this.logger.debug('Will unmount');

        //Зафиксировать закрытие в сторе
        this.props.closePopUp();
        this.removeEventListener();
    }

    componentWillReceiveProps(nextProps) {
        // если есть popUp, то нужно зарегистрировать обработчики и спозиционировать
        if (nextProps.popUp) {
            if (!this.eventListener) {
                this.addEventListener();
            }

            this.resizeTimeout = setTimeout(() => {
                this.resize();
            }, 0);
        } else {
            this.removeEventListener();
        }

        if (!(this.props.popUp && nextProps.popUp)) {
            this.setState({
                positionContainer: null,
                positionArrow: null,
                arrowClass: null
            });
        }
    }

    addEventListener() {
        this.logger.debug('Add events');
        this.removeEventListener();
        this.eventListener = true;
        window.addEventListener('resize', this.onResizeWindow);
        window.addEventListener('scroll', this.onResizeWindow);
        window.addEventListener('keydown', this.keyDown);
        window.addEventListener('click', this.mouseClick);
    }

    removeEventListener() {
        clearTimeout(this.resizeTimeout);
        clearTimeout(this.timeout);

        if (this.eventListener) {
            this.logger.debug('Remove events');
            this.eventListener = false;
            window.removeEventListener('resize', this.onResizeWindow);
            window.removeEventListener('scroll', this.onResizeWindow);
            window.removeEventListener('keydown', this.keyDown);
            window.removeEventListener('click', this.mouseClick);
        }
    }

    resize = (nextProps = this.props) => {
        const {closePopUp} = nextProps;
        this.logger.debug('Resize');

        // Сброс таймера
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = null;

        const element = nextProps.popUp.element;
        // Если нет элемента, то закрываются обработчики событий
        if (!element) {
            this.removeEventListener();
            return;
        }

        // > Расчет позиции
        let clientRect = element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(element, null);
        const padding = {
            top: Number.parseInt(computedStyle.getPropertyValue('padding-top')),
            bottom: Number.parseInt(computedStyle.getPropertyValue('padding-bottom')),
            left: Number.parseInt(computedStyle.getPropertyValue('padding-left')),
            right: Number.parseInt(computedStyle.getPropertyValue('padding-right'))
        };

        if (clientRect.top === 0
            && clientRect.bottom === 0
            && clientRect.left === 0
            && clientRect.right === 0
            && clientRect.width === 0
            && clientRect.height === 0) {
            closePopUp();
            this.removeEventListener();
            return;
        }

        clientRect = {
            top: clientRect.top + padding.top,
            bottom: clientRect.bottom - padding.bottom,
            left: clientRect.left + padding.left,
            right: clientRect.right - padding.right,
            width: clientRect.width - padding.left - padding.right,
            height: clientRect.height - padding.bottom - padding.top
        };

        const tmp = this._popUp.getBoundingClientRect();
        const height = tmp.height + ARROW_HEIGHT;
        const width = tmp.width;

        let containerX = 0,
            containerY = 0,
            arrowX = 0,
            arrowY = 0,
            arrowClass = styles.arrow,
            xOffset = 0;
        if (clientRect.top < height) {
            containerY = Math.ceil(clientRect.bottom + ARROW_HEIGHT);
            arrowY = Math.floor(-height - ARROW_HEIGHT);
            arrowClass = styles.arrowTop;
        } else {
            containerY = Math.ceil(clientRect.top - height);
            arrowY = Math.floor(ARROW_HEIGHT);
        }

        let calcOffset = Math.ceil(width / 2 - (clientRect.width / 2 + clientRect.left));
        xOffset = (calcOffset < 0) ? xOffset : calcOffset;

        if (xOffset === 0) {
            calcOffset = Math.ceil(width / 2 - (window.innerWidth - (clientRect.right - clientRect.width / 2)));
            xOffset = (calcOffset < 0) ? xOffset : -calcOffset;
        }

        containerX = Math.ceil(clientRect.left - width / 2 + clientRect.width / 2) + xOffset;
        arrowX = Math.floor(width / 2 - ARROW_HEIGHT) - xOffset;

        if (containerY < ARROW_HEIGHT) {
            containerY = ARROW_HEIGHT;
        } else if (containerY > window.innerHeight - height) {
            containerY = window.innerHeight - height;
        }
        // <

        this.setState({
            positionContainer: {
                x: containerX,
                y: containerY
            },
            positionArrow: {
                x: arrowX,
                y: arrowY
            },
            arrowClass
        });
    };

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

    /**
     * @method mouseClick
     * @param {MouseEvent} event
     * Закрыть PopUp по клику мыши
     * Можно избежать вызова если использовать stopPropagation на дочернем элементе
     * */
    mouseClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.close();
    };

    /**
     * @method close
     * Закрыть PopUp
     * */
    close = () => {
        const {closePopUp} = this.props;
        closePopUp();
    };

    /**
     * @method onResizeWindow
     * Реализация интервала расчета позиции
     * */
    onResizeWindow = () => {
        if (this.resizeTimeout) {
            return;
        }

        this.resizeTimeout = setTimeout(this.resize, TIME_COUNT);
    };
    
    render () {
        const {popUp} = this.props;
        const {positionContainer, positionArrow, arrowClass} = this.state;
        
        const className = positionContainer ? styles.popUpContainer : styles.popUpContainerUnvisible;

        const translateContainer = positionContainer
            ? `translate3d(${positionContainer.x}px, ${positionContainer.y}px, 0)`
            : null;

        const styleContainer = positionContainer
            ? {
            WebkitTransform: translateContainer,
            MsTransform: translateContainer,
            transform: translateContainer
        }
            : null;

        const translateArrow = positionArrow
            ? `translate3d(${positionArrow.x}px, ${positionArrow.y}px, 0)`
            : null;

        const styleArrow = positionArrow
            ? {
            WebkitTransform: translateArrow,
            MsTransform: translateArrow,
            transform: translateArrow
        }
            : null;

        return (
            <div ref={r => this._popUp = r} className={className} style={styleContainer} onClick={e => e.stopPropagation()}>
                <CloseIcon className={styles.closeIcon} onClick={this.close} />
                <div className={styles.popUp}>{popUp ? popUp.content : null}</div>
                <div className={arrowClass} style={styleArrow}></div>
            </div>
        );
    }
}
module.exports = PopUp;