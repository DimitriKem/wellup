
const React = require('react');
const { connect } = require('react-redux');
const { hashHistory } = require('react-router');
const { bindActionCreators } = require('redux');
const logger = require('js-logger');

const Application = require('./../Components/Application/Application.react.js');
const ApplicationActions = require('./../Actions/ApplicationActions').actions;

const BackgroundActions = require('./../Actions/BackgroundActions').actions;

class ApplicationContainer extends React.Component {
    static displayName = 'ApplicationContainer';

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        application: React.PropTypes.any.isRequired,
        children: React.PropTypes.any,
        regime: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
    };

    constructor (props) {
        super(props);

        this.logger = logger.get(ApplicationContainer.displayName);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        this.logger.debug('Загрузка данных');
        dispatch(ApplicationActions.getData());
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, application} = nextProps;

        // синхронизация состояния url с текущей открытой страницей
        const urlRegime = nextProps.regime;
        const regime = this.checkRegime(application, nextProps.regime);
        if (!application.currentPage && regime == null) {
            // нет ни в url ни в текущем состоянии, находится сегодняшний день
            const currentPage = application.data.get('data').get('routineList').find(val => val.get('isToday'));
            hashHistory.replace(`/${currentPage.get('id')}`);
        } else if (application.data && !application.currentPage && regime != null) {
            // устанавливается день из url
            dispatch(ApplicationActions.setCurrent(regime));
        } else if (application.data && application.currentPage && application.currentPage.get('id') != regime) {
            // устанавливается день из url
            dispatch(ApplicationActions.setCurrent(regime));
        } else if (urlRegime != regime) {
            // устанавливается сегодняшний день, т.к. из url невалидный
            hashHistory.replace(`/${regime}`);
        }
    }

    checkRegime (application, regime) {
        if (application.data && regime != null) {
            // проверяется, валидный ли день установлен в url
            const currentPage = application.data.get('data').get('routineList').find(val => val.get('id') == regime);
            if (!currentPage) {
                regime = application.data.get('data').get('routineList').find(val => val.get('isToday')).get('id');
            }
        }
        return regime;
    }

    render () {
        return (this.props.application.currentPage)
            ? <Application {...this.props} />
            : null;
    }
}


function mapStateToProps(state, props) {
    const {regime} = props.params;
    return {
        regime: regime ? regime : null,
        application: state.application,
        background: state.background
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        setBackground: bindActionCreators(BackgroundActions.setBackground, dispatch)
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ApplicationContainer);
