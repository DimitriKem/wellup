

const styles = require('./SwitchHints.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const logger = require('js-logger');

const ApplicationActions = require('./../../../Actions/ApplicationActions').actions;

const Checkbox = require('./../../Icons/Checkbox.react');

/**
 * @class SwitchHints
 * @extends React.Component
 * */
class SwitchHints extends React.Component {
    static displayName = 'SwitchHints';
    shouldComponentUpdate  = shouldComponentUpdate;
    logger = null;

    constructor(props) {
        super(props);

        this.logger = logger.get(SwitchHints.displayName);
    }

    static propTypes = {
        showHints: React.PropTypes.bool.isRequired,
        dispatch: React.PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.logger.debug('Did mount');
    }

    componentWillUnmount() {
        this.logger.debug('Will unmount');
    }

    toggleHints = () => {
        const {dispatch, showHints} = this.props;
        dispatch(ApplicationActions.setShowHints(!showHints));
    };
    
    render () {
        const {showHints} = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.box} onClick={this.toggleHints}>
                    <Checkbox className={styles.icon} checked={showHints} />
                    <div className={styles.label}>
                        Подсказки и рекомендации
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = SwitchHints;