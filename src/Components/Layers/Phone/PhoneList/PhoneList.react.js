

const styles = require('./PhoneList.less');

const React = require('react');

const List = require('./../../../Application/List/List.react');

const PhoneItem = require('./../PhoneItem/PhoneItem.react.js');

class PhoneList extends List {
    scrollFix = false; // true - исправление бага совместного использования Sortable со Swipe
    sortableStyles = styles;

    renderItemsList (props = this.props) {
        const {dispatch, activeItem, list, page, showHints} = props;
        if (this.isUpdateList(props)) {
            return;
        }
        this.setState({
            list: list.map(item =>
                <PhoneItem
                    key={item.get('id')}
                    dispatch={dispatch}
                    isPassed={this.isPassed(item)}
                    active={activeItem === item.get('id')}
                    item={item}
                    pageId={page && activeItem === item.get('id') ? page.get('id') : null}
                    showHints={showHints} />
            )
        });
    }

    render() {
        const {list} = this.state;
        return (
            <div ref={r => this._container = r} className={styles.list}>
                {list}
            </div>
        )
    }
}

module.exports = PhoneList;