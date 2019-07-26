const styles = require('./EditMenu.less');

const React = require('react');

const PenIcon = require('./../../Icons/PenIcon.react');
const RendoIcon = require('./../../Icons/RendoIcon.react');

const ApplicationActions = require('./../../../Actions/ApplicationActions').actions;

class EditMenu extends React.PureComponent {
    static displayName = 'EditMenu';

    static propTypes = {
        allowReturnToWellup: React.PropTypes.bool.isRequired,
        pageId: React.PropTypes.any.isRequired,
        dispatch: React.PropTypes.func.isRequired,
    };

    resetToWellUp = () => {
        const {pageId, allowReturnToWellup, dispatch} = this.props;
        if (!allowReturnToWellup) {
            return;
        }
        dispatch(ApplicationActions.resetToWellUp(pageId))
    };

    render () {
        const {allowReturnToWellup} = this.props;
        return (
            <div className={styles.menu}>

                <div className={`${styles.rendo} ${allowReturnToWellup ? '' : styles.disabled}`} onClick={this.resetToWellUp}>
                    <RendoIcon />
                    <div className={`${styles.text}`}>
                        Вернуть wellup режим
                    </div>
                </div>

                <div className={styles.update}>
                    <PenIcon />
                    <div className={styles.text}>
                        Изменить
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = EditMenu;