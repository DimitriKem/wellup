const styles = require('./Controls.less');

const React = require('react');

const PenIcon = require('./../../../Icons/PenIcon.react');
const RendoIcon = require('./../../../Icons/RendoIcon.react');
const BellIcon = require('./../../../Icons/BellIcon.react');

const ApplicationActions = require('./../../../../Actions/ApplicationActions').actions;

class Controls extends React.PureComponent {
    static displayName = 'Controls';

    static propTypes = {
        allowReturnToWellup: React.PropTypes.bool.isRequired,
        pageId: React.PropTypes.any.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        onToogleShowMessengersList: React.PropTypes.func.isRequired,
    };

    resetToWellUp = () => {
        const {pageId, allowReturnToWellup, dispatch} = this.props;
        if (!allowReturnToWellup) {
            return;
        }
        dispatch(ApplicationActions.resetToWellUp(pageId));
    };

    openMessengersList = () => {
        this.props.onToogleShowMessengersList(true);
    };

    render () {
        const {allowReturnToWellup} = this.props;
        return (
            <div className={styles.controls}>

                <div className={`${styles.rendo} ${allowReturnToWellup ? '' : styles.disabled}`} onClick={this.resetToWellUp}>
                    <RendoIcon />
                    <div className={`${styles.text}`}>
                        Wellup режим
                    </div>
                </div>

                <div className={styles.update}>
                    <PenIcon />
                    <div className={styles.text}>
                        Изменить
                    </div>
                </div>

                <div className={styles.alerts} onClick={this.openMessengersList}>
                    <BellIcon />
                    <div className={styles.text}>
                        Уведомления
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = Controls;