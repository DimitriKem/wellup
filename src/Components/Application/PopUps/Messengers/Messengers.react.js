

const styles = require('./Messengers.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const { connect } = require('react-redux');

const ApplicationActions = require('./../../../../Actions/ApplicationActions').actions;
const PopUpActions = require('./../../../../Actions/PopUpActions').actions;

const MessengerItem = require('./MessengerItem/MessengerItem.react.js');

class PopUpMessengers extends React.Component {
    static displayName = 'PopUpMessengers';
    shouldComponentUpdate = shouldComponentUpdate;

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        messengerList: React.PropTypes.any.isRequired,
        blockId: React.PropTypes.any.isRequired,
        block: React.PropTypes.any.isRequired,
        pageId: React.PropTypes.any.isRequired
    };

    componentWillMount () {
        this.renderItems();
    }

    renderItems = (props = this.props) => {
        const {dispatch} = props;
        const messengerList = props.messengerList.toJS();
        this.setState({
            items: messengerList.map(d => <MessengerItem key={d.id} {...d} onChange={this.onChange} dispatch={dispatch} />)
        });
    };

    onChange = (id) => {
        const {messengerList, blockId, pageId, dispatch} = this.props;
        let list = messengerList.toJS().filter(m => m.installed).map(m => m.id);
        const index = list.indexOf(id);
        if (index !== -1) {
            list.splice(index, 1);
        } else {
            list.push(id);
        }
        dispatch(ApplicationActions.setMessengersToBlock(pageId, blockId, list));
    };
    
    componentWillReceiveProps(nextProps) {
        if (this.props.messengerList.size !== nextProps.messengerList.size) {
            nextProps.dispatch(PopUpActions.resize());
        }
        this.renderItems(nextProps);
    }
    
    render(s = styles) {
        const {items} = this.state;
        const {block} = this.props;
        return (
            <div className={s.messengers}>
                <h2 className={s.header}>
                    Уведомлять о {block.get('name')} по
                </h2>

                <div className={s.items}>
                    {items}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state, props) {
    const {blockId} = props;
    const block = state.application.currentPage
        .get('blockList')
        .find(d => d.get('id') === blockId);
    return {
        messengerList: block.get('messengerList'),
        block: block
    };
}

module.exports = connect(mapStateToProps)(PopUpMessengers);