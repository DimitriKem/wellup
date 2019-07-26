

const styles = require('./UpsItem.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');

const CategoryIcon = require('./../../../../Icons/CategoryIcon.react');

class UpsItem extends React.Component {
    static displayName = 'UpsItem';
    shouldComponentUpdate = shouldComponentUpdate;

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        id: React.PropTypes.any.isRequired,
        name: React.PropTypes.string.isRequired,
        code: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired
    };
    
    render() {
        const {name, description} = this.props;
        return (
            <div className={styles.item} title={name}>
                <div className={styles.description} dangerouslySetInnerHTML={{__html: description}}>
                </div>
            </div>
        )
    }
}

module.exports = UpsItem;