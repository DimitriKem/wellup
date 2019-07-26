

const styles = require('./PhoneRepeats.less');

const React = require('react');
const { connect } = require('react-redux');

const ApplicationActions = require('./../../../../../Actions/ApplicationActions').actions;

const RepeatItem = require('./../../../../Application/PopUps/Repeats/RepeatItem/RepeatItem.react.js');
const Repeats = require('./../../../../Application/PopUps/Repeats/Repeats.react');

class PopUpPhoneRepeats extends Repeats {
    static displayName = 'PopUpPhoneRepeats';

    onChange = (id) => {
        const {repeatList, blockId, pageId, dispatch} = this.props;
        let list = repeatList.toJS().filter(m => m.installed).map(m => m.id);
        const index = list.indexOf(id);
        if (index !== -1) {
            list.splice(index, 1);
        } else {
            list.push(id);
        }
        dispatch(ApplicationActions.setRepeatsToBlock(pageId, blockId, list));
    };
    
    render() {
        const {dispatch} = this.props;
        const {block} = this.props;
        const repeatList = this.props.repeatList.toJS();
        return (
            <div className={styles.repeatsList}>
                <h2 className={styles.header}>
                    {block.get('name')} запланирован в
                </h2>

                <div className={styles.items}>
                    <RepeatItem {...repeatList[0]} onChange={this.onChange} dispatch={dispatch} />
                    <RepeatItem {...repeatList[1]} onChange={this.onChange} dispatch={dispatch} />
                    <RepeatItem {...repeatList[2]} onChange={this.onChange} dispatch={dispatch} />
                    <RepeatItem {...repeatList[3]} onChange={this.onChange} dispatch={dispatch} />
                    <RepeatItem {...repeatList[4]} onChange={this.onChange} dispatch={dispatch} />
                    <RepeatItem {...repeatList[5]} onChange={this.onChange} dispatch={dispatch} />
                    <RepeatItem {...repeatList[6]} onChange={this.onChange} dispatch={dispatch} />
                </div>
            </div>
        )
    }
}

//fixme(Золотницкий): завернуть в контейнер
function mapStateToProps(state, props) {
    const {blockId} = props;
    const block = state.application.currentPage
        .get('blockList')
        .find(d => d.get('id') === blockId);
    return {
        repeatList: block.get('repeatList'),
        block: block
    };
}

module.exports = connect(mapStateToProps)(PopUpPhoneRepeats);