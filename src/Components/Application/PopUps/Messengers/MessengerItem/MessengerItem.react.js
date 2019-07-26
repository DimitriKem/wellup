/**
 * Created by Игорь on 10.07.2016.
 */

const styles = require('./MessengerItem.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const logger = require('js-logger');

const Checkbox = require('./../../../../Icons/Checkbox2.react');

class MessengerItem extends React.Component {
    static displayName = 'MessengerItem';
    shouldComponentUpdate = shouldComponentUpdate;

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        nameAdditional: React.PropTypes.string.isRequired,
        code: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        installed: React.PropTypes.bool.isRequired
    };

    onChange = () => {
        const {id, onChange, name} = this.props;
        onChange(id);
    };
    
    render(s = styles) {
        const {name, nameAdditional, installed} = this.props;
        return (
            <div className={s.item} title={nameAdditional}>
                <Checkbox className={styles.icon} checked={installed} onClick={this.onChange}/>
                <div className={styles.name} onClick={this.onChange}>
                    {name}
                </div>
            </div>
        )
    }
}

module.exports = MessengerItem;