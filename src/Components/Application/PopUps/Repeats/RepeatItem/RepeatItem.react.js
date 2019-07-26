

const styles = require('./RepeatItem.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const Checkbox = require('./../../../../Icons/Checkbox2.react');

class RepeatItem extends React.Component {
    static displayName = 'RepeatItem';
    shouldComponentUpdate = shouldComponentUpdate;

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        id: React.PropTypes.any.isRequired,
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        installed: React.PropTypes.bool.isRequired
    };

    onChange = () => {
        const {id, onChange} = this.props;
        onChange(id);
    };
    
    render() {
        const {name, nameAdditional, installed} = this.props;
        return (
            <div className={styles.item} title={nameAdditional}>
                <Checkbox className={styles.icon} checked={installed} onClick={this.onChange}/>
                <div className={styles.name} onClick={this.onChange}>
                    {name}
                </div>
            </div>
        )
    }
}

module.exports = RepeatItem;