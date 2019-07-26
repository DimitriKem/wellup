
const styles = require('./Application.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const logger = require('js-logger');

const Background = require('./../Background/Background.react');
const MessagesContainer = require('./../../Containers/MessagesContainer.react');
const LayerContainer = require('./../../Containers/LayerContainer.react');

const Desktop = require('./../Layers/Desktop/Desktop.react');
const Tablet = require('./../Layers/Tablet/Tablet.react');
const Phone = require('./../Layers/Phone/Phone.react');

const Defs = require('./../Icons/Defs.react');

const DesktopLayer = LayerContainer(Desktop);
const TabletLayer = LayerContainer(Tablet);
const PhoneLayer = LayerContainer(Phone);

class Application extends React.Component {
    static displayName = 'Application';
    static DEVICE_MOBILE = '1px';
    static DEVICE_TABLET = '2px';
    static DEVICE_DESKTOP = '3px';

    static TIMEOUT_RESIZE = 200;
    timeout = null;

    shouldComponentUpdate = shouldComponentUpdate;
    logger = null;
    
    constructor(props) {
        super(props);

        this.logger = logger.get(Application.displayName);
        this.state = {
            layer: null
        };
    }

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        setBackground: React.PropTypes.func.isRequired,
        children: React.PropTypes.any,
        background: React.PropTypes.shape({
            backgroundClassName: React.PropTypes.string,
            fontClassName: React.PropTypes.string,
            hour: React.PropTypes.number
        }),
        application: React.PropTypes.any
    };

    componentDidMount() {
        this.logger.debug('did mount');

        this.changeLayer();
        window.addEventListener('resize', this.resize);
    }

    /**
     * @method changeLayer
     * В зависимости от принятого стиля выбирается версия приложения
     * Т.е. версия приложения выбирается по @media only screen и device-width, что является правильным
     * */
    changeLayer = () => {
        const detectDevice = window.getComputedStyle(this._detectDevice, null).getPropertyValue("width");

        // В зависимости от принятого стиля выбирается версия приложения
        // Т.е. версия приложения выбирается по @media only screen и device-width, что является правильным
        let layer = <DesktopLayer />;
        if (detectDevice === Application.DEVICE_MOBILE) {
            layer = <PhoneLayer />;
            this.logger.debug('Мобильная версия');
        } else if (detectDevice === Application.DEVICE_TABLET) {
            layer = <TabletLayer />;
            this.logger.debug('Планшетная версия');
        } else {
            this.logger.debug('Десктопная версия');
        }

        // Состояние компонента меняется последним в стеке вызовов, т.к. в componentDidMount нельзя менять
        this.timeout = setTimeout(() => {
            this.setState({layer});
            clearTimeout(this.timeout);
            this.timeout = null;
        }, 0);
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
        clearTimeout(this.timeout);
        this.timeout = null;
    }

    /**
     * @method resize
     * Обработчик события ресайза
     * Вызывается с временными прерываниями равными TIMEOUT_RESIZE
     * */
    resize = () => {
        if (this.timeout) {
            return;
        }

        this.timeout = setTimeout(() => {
            this.logger.debug('resize');
            clearTimeout(this.timeout);
            this.timeout = null;
            this.changeLayer();
        }, Application.TIMEOUT_RESIZE)
    };

    render() {
        const {children, setBackground, background} = this.props;
        const {layer} = this.state;

        return (
            <div className={`${styles.application} ${background.fontClassName}`}>
                <Defs />
                {layer}

                <Background setBackground={setBackground} background={background} />
                <MessagesContainer />

                <div ref={r => this._detectDevice = r} className={styles.detectDevice}>
                    &nbsp;
                </div>
                {children}
            </div>
        )
    }
}

module.exports = Application;