

const styles = require('./RightContent.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');

const MessengersList = require('./../../../Application/MessengersList/Messengers.react');
const SwitchHints = require('./../../../Application/SwitchHints/SwitchHints.react');
const Hints = require('./../../../Application/Hints/Hints.react');
const EditMenu = require('./../../../Application/EditMenu/EditMenu.react');

class DesktopRightContent extends React.Component {
    static displayName = 'DesktopRightContent';
    shouldComponentUpdate = shouldComponentUpdate;

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        messengersList: React.PropTypes.any.isRequired,
        showHints: React.PropTypes.bool.isRequired,
        expertList: React.PropTypes.any.isRequired,
        pageId: React.PropTypes.any.isRequired,
        hasChangedDay: React.PropTypes.bool.isRequired,
    };
    
    render() {
        const {dispatch, showHints, pageId, hasChangedDay} = this.props;
        const messengersList = this.props.messengersList.toJS();
        const expertList = this.props.expertList.toJS();
        return (
            <div className={styles.content}>
                <MessengersList dispatch={dispatch} messengersList={messengersList} />
                <EditMenu pageId={pageId} dispatch={dispatch} allowReturnToWellup={hasChangedDay} />
                <SwitchHints dispatch={dispatch} showHints={showHints} />
                <Hints dispatch={dispatch} showHints={showHints} expertList={expertList} />
            </div>
        )
    }
}

module.exports = DesktopRightContent;