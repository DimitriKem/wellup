const React = require('react');

const MessengerItem = require('./../../../../Application/MessengersList/MessengerItem/MessengerItem.react');
const SetIcon = require('./SetIcon/SetIcon.react');


class Item extends MessengerItem {
    static displayName='PhoneMessengersItem';
   
    render() {
        const {name, installed} = this.props;
        const containerClassName = `${this.styles.item} ${!installed ? this.styles.deactive : ''}`;
        return (
            <div className={containerClassName}>
                <div className={this.styles.name}>{name}</div>
                <SetIcon active={installed} onChange={this.onChangeActive} />
            </div>
        )
    }
}

module.exports = Item;