/**
 * Created by Игорь on 10.07.2016.
 */

const styles = require('./MessengerItem.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const logger = require('js-logger');

const ActiveIcon = require('./ActiveIcon/ActiveIcon.react');

class MessengerItem extends React.Component {
    static displayName = 'MessengerItem';
    shouldComponentUpdate = shouldComponentUpdate;

    constructor(props) {
        super(props);

        this.logger = logger.get(MessengerItem.displayName);
        this.styles = styles;
    }

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        id: React.PropTypes.any.isRequired,
        name: React.PropTypes.string.isRequired,
        nameAdditional: React.PropTypes.string.isRequired,
        code: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        onDelete: React.PropTypes.func.isRequired,
        onAdd: React.PropTypes.func.isRequired,
        installed: React.PropTypes.bool.isRequired,
    };

    onChangeActive = (status) => {
        const {id, onDelete, onAdd} = this.props;
        if (status) {
            onAdd(id);
        } else {
            onDelete(id);
        }
    };
    
    render() {
        const {name, installed} = this.props;
        const containerClassName = `${this.styles.item} ${!installed ? this.styles.deactive : ''}`;
        return (
            <div className={containerClassName}>
                <div className={this.styles.name}>{name}</div>
                <ActiveIcon active={installed} onChange={this.onChangeActive} />
            </div>
        )
    }
}

module.exports = MessengerItem;