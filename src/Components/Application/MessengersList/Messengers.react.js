

const styles = require('./Messengers.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const ApplicationActions = require('./../../../Actions/ApplicationActions.js').actions;

const MessengerItem = require('./MessengerItem/MessengerItem.react.js');

const ButtonWithRadius = require('./../../Button/ButtonWithRadius.react');

class Messengers extends React.Component {
    static displayName = 'Messengers';
    shouldComponentUpdate = shouldComponentUpdate;

    constructor(props) {
        super(props);

        this.styles = styles;
    }

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        messengersList: React.PropTypes.array.isRequired
    };

    componentWillMount () {
        this.renderItems();
        this.setState({
            showList: true
        });
    }

    renderItems = (s = styles, props = this.props) => {
        const {dispatch, messengersList} = props;
        this.setState({
            items: messengersList
                .map(d => <MessengerItem key={d.id} {...d} onAdd={this.addMessenger} onDelete={this.deleteMessenger} dispatch={dispatch} />),
        });
    };

    showList = (event) => {
        event.preventDefault();
        this.setState({
            showList: !this.state.showList
        })
    };

    deleteMessenger = (id) => {
        const {dispatch} = this.props;
        dispatch(ApplicationActions.deleteMessenger(id));
    };

    addMessenger = (id) => {
        const {dispatch, messengersList} = this.props;
        dispatch(ApplicationActions.addMessenger(id));
    };
    
    componentWillReceiveProps(nextProps) {
        if (this.props.messengersList !== nextProps.messengersList) {
            this.renderItems(undefined, nextProps);
        }
    }
    
    render() {
        const {items, showList} = this.state;
        return (
            <div className={this.styles.messengers}>
                <h2 className={this.styles.header}>
                    Уведомления
                </h2>

                <p className={this.styles.helpText}>
                    Для того чтобы следовать режиму и бла бла бла мы советуем включить увеомления
                </p>
                
                <ButtonWithRadius className={this.styles.hideButton} text={showList ? "Скрыть" : "Показать"} onClick={this.showList} />

                <ReactCSSTransitionGroup
                    transitionName={{
                        enter: styles.itemEnter,
                        enterActive: styles.itemEnterActive,
                        leave: styles.itemLeave,
                        leaveActive: styles.itemLeaveActive,
                    }}
                    className={styles.itemsBox}
                    component="div"
                    transitionAppear={false}
                    transitionEnter={true}
                    transitionEnterTimeout={300}
                    transitionLeave={true}
                    transitionLeaveTimeout={300}
                >
                    {
                        showList
                            ? (
                                <div className={this.styles.list}>
                                    {items}
                                    
                                    <p className={this.styles.hint}>
                                        Отключить или настроить уведомления для отдельных событий можно нажав на иконку колокольчика на полосе события
                                    </p>
                                </div>
                            )
                            : null
                    }
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

module.exports = Messengers;