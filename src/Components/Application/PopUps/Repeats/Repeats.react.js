

const styles = require('./Repeat.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const { connect } = require('react-redux');

const ApplicationActions = require('./../../../../Actions/ApplicationActions').actions;
const PopUpActions = require('./../../../../Actions/PopUpActions').actions;

const RepeatItem = require('./RepeatItem/RepeatItem.react.js');

class PopUpRepeats extends React.Component {
    static displayName = 'PopUpRepeats';
    shouldComponentUpdate = shouldComponentUpdate;
    
    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        repeatList: React.PropTypes.any.isRequired,
        blockId: React.PropTypes.any.isRequired,
        block: React.PropTypes.any.isRequired,
        pageId: React.PropTypes.any.isRequired,
    };

    componentWillMount () {
    }

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

    componentWillReceiveProps() {}
    
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
                    <div className={styles.columns}>
                        <RepeatItem {...repeatList[0]} onChange={this.onChange} dispatch={dispatch} />
                        <RepeatItem {...repeatList[1]} onChange={this.onChange} dispatch={dispatch} />
                        <RepeatItem {...repeatList[2]} onChange={this.onChange} dispatch={dispatch} />
                        <RepeatItem {...repeatList[3]} onChange={this.onChange} dispatch={dispatch} />
                    </div>
                    <div className={styles.columns}>
                        <RepeatItem {...repeatList[4]} onChange={this.onChange} dispatch={dispatch} />
                        <RepeatItem {...repeatList[5]} onChange={this.onChange} dispatch={dispatch} />
                        <RepeatItem {...repeatList[6]} onChange={this.onChange} dispatch={dispatch} />
                    </div>
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

module.exports = connect(mapStateToProps)(PopUpRepeats);