
const styles = require('./PhoneMessengersList.less');

const React = require('react');

const MessengersList = require('./../../../Application/MessengersList/Messengers.react');
const CloseIcon = require('./../../../Icons/DeleteIcon.react');
const MessengerItem = require('./Item/Item.react');

class PhoneMessengersList extends MessengersList {
    static displayName='PhoneMessengersList';

    constructor(props) {
        super(props);

        this.styles = Object.assign({}, this.styles, styles);
    }

    close = ()=> {
        this.props.onClose(false);
    }
    

    renderItems = (s = styles, props = this.props) => {
        const {dispatch, messengersList} = props;
        this.setState({
            items: messengersList
                .map(d => <MessengerItem key={d.id} {...d} onAdd={this.addMessenger} onDelete={this.deleteMessenger} dispatch={dispatch} />),
        });
    };

    render() {
        const {items, showList} = this.state;
        return (
            <div className={this.styles.messengers}>
                <CloseIcon className={styles.closeIcon} onClick={this.close} />
                <h2 className={this.styles.header}>
                    Уведомления
                </h2>

                <p className={this.styles.helpText}>
                    Для того чтобы следовать режиму и бла бла бла мы советуем включить увеомления
                </p>
                
                <div className={this.styles.list}>
                    {items}
                    
                    <p className={this.styles.hint}>
                        Отключить или настроить уведомления для отдельных событий можно нажав на иконку колокольчика на полосе события
                    </p>
                </div>
                        
            </div>
        )
    }
}

module.exports = PhoneMessengersList;