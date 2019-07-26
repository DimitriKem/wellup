
const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const logger = require('js-logger');
const ActiveItemActions = require('./../../Actions/ActiveItemActions').actions;

class Layer extends React.Component {
    static displayName = 'Layer';
    shouldComponentUpdate = shouldComponentUpdate;
    logger = null;
    
    constructor(props) {
        super(props);

        this.logger = logger.get(Layer.displayName);
        this.state = {
            currentPage: props.application.currentPage,
            nextPage: props.application.nextPage,
            prevPage: props.application.prevPage,
            pagesList: props.application.data.get('data').get('routineList'),
            messengersList: props.application.messengersList,
            showHints: !!props.application.showHints,
            expertList: props.application.expertList,
        }
    }

    static propTypes = {
        activeItem: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        dispatch: React.PropTypes.func.isRequired,
        popUp: React.PropTypes.object,
        hour: React.PropTypes.number,
        application: React.PropTypes.object
    };

    componentDidMount() {
        this.logger.debug('Did mount');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentPage: nextProps.application.currentPage,
            nextPage: nextProps.application.nextPage,
            prevPage: nextProps.application.prevPage,
            pagesList: nextProps.application.data.get('data').get('routineList'),
            messengersList: nextProps.application.messengersList,
            showHints: !!nextProps.application.showHints,
            expertList: nextProps.application.expertList,
        });
    }

    componentWillUnmount() {
        this.logger.debug('Wid mount');

        // Сброс активного элемента
        this.props.dispatch(ActiveItemActions.reset());
    }
}

module.exports = Layer;