
const styles = require('./Background.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const logger = require('js-logger');

const getColorScheme = require('./../../Utils/getColorScheme');

class Background extends React.Component {
    static displayName = 'Background';
    shouldComponentUpdate = shouldComponentUpdate;
    logger = null;
    hour = null;
    interval = null;

    constructor(props) {
        super(props);

        this.logger = logger.get(Background.displayName);
    }

    static propTypes = {
        setBackground: React.PropTypes.func.isRequired,
        background: React.PropTypes.shape({
            backgroundClassName: React.PropTypes.string,
            fontClassName: React.PropTypes.string,
            bodyClassName:  React.PropTypes.string,
            schemeClassName:  React.PropTypes.string,
            hour: React.PropTypes.number
        })
    };

    componentWilllUnmount() {
        clearInterval(this.interval);
    }

    intervalTick() {
        // Устанавливается фон
        const hour = (new Date()).getHours();
        if (this.hour !== hour) {
            this.hour = hour;
            this.changeBackground(hour);
        }
    }

    componentDidMount() {
        this.interval = setInterval(this.intervalTick, 500);

        // Для тестирования
        window.changeBackground = this.changeBackground.bind(this);

        this.logger.debug('did mount');
    }

    changeBackground(hour) {
        const {setBackground} = this.props;
        const oHour = hour < 10 ? '0' + hour : '' + hour;
        this.logger.debug('color'  + oHour, styles['color'  + oHour], styles['background'  + oHour], getColorScheme[oHour]);
        setBackground(
            styles['color'  + oHour],
            styles['font-color'  + oHour],
            styles['background'  + oHour],
            getColorScheme[oHour],
            hour
        );
    }

    componentDidUpdate(prevProps) {
        //background для body
        if (this.props.background !== prevProps.background) {
            const backgroundClassName = this.props.background.backgroundClassName;
            const bodyClassList = document.querySelector('body').classList;
            const appClassList = document.querySelector('#app').classList;
            // Удаление лишних классов
            for (let i = 0; i < 24; i++) {
                const hour = (i < 10) ? '0' + i : '' + i;
                bodyClassList.remove(styles['color'  + hour]);
                appClassList.remove(getColorScheme[hour]);
            }

            const {hour} = this.props.background;
            bodyClassList.add(backgroundClassName);
            appClassList.add(getColorScheme[(hour < 10) ? '0' + hour : '' + hour]);
            this.logger.debug('Изменился фон: ', backgroundClassName);
        }
    }

    render() {
        const {background} = this.props;
        return null;
        /*return (
            <div className={`${styles.background} ${background.backgroundClassName}`}>
            </div>
        );*/
    }
}

module.exports = Background;