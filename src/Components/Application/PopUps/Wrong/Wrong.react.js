

const styles = require('./Wrong.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');

class PopUpWrong extends React.Component {
    static displayName = 'PopUpWrong';
    shouldComponentUpdate = shouldComponentUpdate;

    static propTypes = {
        description: React.PropTypes.any.isRequired
    };
    
    render() {
        const {description} = this.props;
        return (
            <div className={styles.wrong}>
                <h2 className={styles.header}>
                    Нелогичность
                </h2>

                <div className={styles.description}>
                    {description}
                </div>
            </div>
        )
    }
}

module.exports = PopUpWrong;