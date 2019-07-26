

const styles = require('./Item.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const {Message, actions} = require('./../../../Actions/MessagesActions');
const PopUpActions = require('./../../../Actions/PopUpActions').actions;
const ActiveItemActions = require('./../../../Actions/ActiveItemActions').actions;
const ApplicationActions = require('./../../../Actions/ApplicationActions').actions;

const Button = require('./../../Button/Button.react');
const PopUpMessengers = require('./../PopUps/Messengers/Messengers.react');
const PopUpUps = require('./../PopUps/Ups/Ups.react');
const PopUpRepeats = require('./../PopUps/Repeats/Repeats.react');
const PopUpWrong = require('./../PopUps/Wrong/Wrong.react');

const BucketIcon = require('./../../Icons/BucketIcon.react');
const UpIcon = require('./../../Icons/UpIcon.react');
const SettingsIcon = require('./../../Icons/SettingsIcon.react');
const AlertIcon = require('./../../Icons/AlertIcon.react');
const BellIcon = require('./../../Icons/BellIcon.react');
const BellIconClosed = require('./../../Icons/BellIconClosed.react');
const TimeDeco = require('./../../Icons/TimeDeco.react');
const CategoryIcon = require('./../../Icons/CategoryIcon.react');

class Item extends React.Component {
    static POP_UP_MESSENGERS = 0;
    static POP_UP_UPS = 1;
    static POP_UP_REPEATS = 2;
    static displayName = 'Item';
    shouldComponentUpdate = shouldComponentUpdate;

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        active: React.PropTypes.bool.isRequired,
        item: React.PropTypes.any.isRequired,
        pageId: React.PropTypes.any,
        isPassed: React.PropTypes.bool,
        showHints: React.PropTypes.bool.isRequired

    };

    constructor (props) {
        super(props);

        this.state = {
            opened: false
        };
    }

    /**
     * Восстановить блок
     * @param {String | Number} messageId - сообщение, которое нужно удалить
     * @param {String | Number} pageId - routineId
     * @param {String | Number} blockId - blockId
     * */
    restoreItem(messageId, pageId, blockId) {
        const {dispatch} = this.props;
        dispatch(ApplicationActions.restoreBlock(pageId, blockId));
        dispatch(actions.removeMessage(messageId));
    }

    /**
     * Удалить блок
     * Блок можно восстановить
     * */
    deleteItem = () => {
        const {dispatch, pageId} = this.props;
        const id = this.props.item.get('id');
        const name = this.props.item.get('name');
        const message = new Message(`${name} удален`, Message.MESSAGE_TYPE_ERROR);
        const _id = message.getId();
        const buttons = [
            <Button key={0} text="Восстановить" onClick={() => this.restoreItem(_id, pageId, id)} />
        ];
        message.setButtons(buttons);
        dispatch(ApplicationActions.deleteBlock(pageId, id));
        dispatch(actions.addMessage(message));
    };

    open = () => this.props.dispatch(ActiveItemActions.setActiveItem(this.props.item.get('id')));
    close = () => this.props.dispatch(ActiveItemActions.reset());

    /**
     * Показать список сообщений
     * */
    showMessengers = () => {
        const {dispatch, item, pageId} = this.props;
        this.open();
        dispatch(PopUpActions.showPopUp(<PopUpMessengers messengerList={item.get('messengerList')} blockId={item.get('id')} pageId={pageId} dispatch={dispatch} />, this._bell));
    };

    /**
     * Показать список советов
     * */
    showUps = () => {
        const {dispatch, item, pageId} = this.props;
        const adviceList = item.get('adviceList');
        if (!adviceList.size) {
            return null;
        }
        this.open();
        dispatch(PopUpActions.showPopUp(<PopUpUps upsList={adviceList} blockId={item.get('id')} pageId={pageId} dispatch={dispatch} />, this._up));
    };

    /**
     * Показать нелогичность
     * */
    showWrong = () => {
        const {dispatch, item} = this.props;
        this.open();
        dispatch(PopUpActions.showPopUp(<PopUpWrong description={item.get('wrongDescription')} dispatch={dispatch} />, this._wrong));
    };

    /**
     * Показать список повторов
     * */
    showRepeats = () => {
        const {dispatch, item, pageId} = this.props;
        this.open();
        dispatch(PopUpActions.showPopUp(<PopUpRepeats repeatList={item.get('repeatList')} blockId={item.get('id')} pageId={pageId} dispatch={dispatch} />, this._repeats));
    };
    
    render() {
        const {name, isWrong, start, end, messengerList, categoryColor, adviceList} = this.props.item.toJS();
        const {active, isPassed, showHints} = this.props;
        let className = '';
        if (isPassed) {
            className = active ? styles.itemOpenedPassed : styles.itemPassed
        } else {
            className = active ? styles.itemOpened : styles.item
        }

        const isBellIconClosed = !(messengerList && messengerList.some(d => d.installed));

        return (
            <div className={className}>
                <div ref={r => this._wrong = r} className={styles.alert}>
                    <div className={styles.alertIconDefault}>
                        <ReactCSSTransitionGroup
                            transitionName={{
                                enter: styles.alertEnter,
                                enterActive: styles.alertEnterActive,
                                leave: styles.alertLeave,
                                leaveActive: styles.alertLeaveActive,
                            }}
                            className={styles.alertBox}
                            component="div"
                            transitionAppear={false}
                            transitionEnter={true}
                            transitionEnterTimeout={300}
                            transitionLeave={true}
                            transitionLeaveTimeout={300}
                        >
                            {
                                showHints && isWrong
                                    ? <AlertIcon className={styles.alertIcon} key="alert" />
                                    : null
                            }
                        </ReactCSSTransitionGroup>
                    </div>
                </div>

                <div ref={r => this._bell = r} className={isBellIconClosed ? styles.bellClosed : styles.bell}>
                    <div className={styles.iconBox} onClick={this.showMessengers}>
                        {
                            isBellIconClosed
                                ? <BellIconClosed className={styles.bellIcon} />
                                : <BellIcon className={styles.bellIcon} />
                        }
                    </div>
                </div>

                <div className={styles.timeDeco}>
                    <TimeDeco className={styles.timeDecoIcon} />
                </div>

                <div className={styles.time}>
                    <div className={styles.timeRow}>{start}</div>
                    <div className={styles.timeRow}>{end}</div>
                </div>

                <div className={styles.category}>
                    <CategoryIcon color={categoryColor} />
                </div>

                <div className={styles.title}>
                    <span title={name}>{name}</span>
                </div>

                <div ref={r => this._repeats = r} className={styles.repeat}>
                    <div className={styles.iconBox} onClick={this.showRepeats}>
                        <SettingsIcon className={styles.repeatIcon} />
                    </div>
                </div>

                <div ref={r => this._up = r} className={styles.up}>
                    <div className={`${styles.iconBox} ${!adviceList.length ? styles.iconBoxDisabled : ''}`} onClick={this.showUps}>
                        <UpIcon className={styles.upIcon} />
                    </div>
                </div>

                <div className={styles.bucket}>
                    <div className={styles.iconBox} onClick={this.deleteItem}>
                        <BucketIcon className={styles.bucketIcon} />
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Item;