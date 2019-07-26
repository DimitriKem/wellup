

const styles = require('./PhoneItem.less');

const React = require('react');

const PopUpActions = require('./../../../../Actions/PopUpActions').actions;

const Item = require('./../../../Application/Item/Item.react');
const ButtonBlue = require('./../../../Button/ButtonBlue.react');

const PopUpUps = require('./../../../Application/PopUps/Ups/Ups.react');
const PhoneRepeats = require('./../PhonePopUps/PhoneRepeats/PhoneRepeats.react');
const PhoneMessengers = require('./../PhonePopUps/PhoneMessengers/PhoneMessengers.react');

const BucketIcon = require('./../../../Icons/BucketIcon.react');
const UpIcon = require('./../../../Icons/UpIcon.react');
const SettingsIcon = require('./../../../Icons/SettingsIcon.react');
const AlertIcon = require('./../../../Icons/AlertIcon.react');
const BellIcon = require('./../../../Icons/BellIcon.react');
const BellIconClosed = require('./../../../Icons/BellIconClosed.react');
const TimeDeco = require('./../../../Icons/TimeDeco.react');
const CategoryIcon = require('./../../../Icons/CategoryIcon.react');
const RightArrowIcon = require('./../../../Icons/RightArrowIcon.react');

class PhoneItem extends Item {
    _showMessengers = () => {
        const {dispatch, item, pageId} = this.props;
        const buttons = [
            <ButtonBlue key={0} className={styles.button} onClick={() => dispatch(PopUpActions.hidePopUp())} text="OK" />
        ];
        dispatch(PopUpActions.showPopUp(<PhoneMessengers messengerList={item.get('messengerList')} blockId={item.get('id')} pageId={pageId} dispatch={dispatch} />, null, buttons));
    };

    _showUps = () => {
        const {dispatch, item, pageId} = this.props;
        const adviceList = item.get('adviceList');
        if (!adviceList.size) {
            return null;
        }

        const buttons = [
            <ButtonBlue key={0} className={styles.button} onClick={() => dispatch(PopUpActions.hidePopUp())} text="OK" />
        ];
        dispatch(PopUpActions.showPopUp(<PopUpUps upsList={adviceList} blockId={item.get('id')} pageId={pageId} dispatch={dispatch} />, null, buttons));
    };

    _showRepeats = () => {
        const {dispatch, item, pageId} = this.props;
        const buttons = [
            <ButtonBlue key={0} className={styles.button} onClick={() => dispatch(PopUpActions.hidePopUp())} text="OK" />
        ];
        dispatch(PopUpActions.showPopUp(<PhoneRepeats repeatList={item.get('repeatList')} blockId={item.get('id')} pageId={pageId} dispatch={dispatch} />, null, buttons));
    };

    render() {
        const {active, isPassed, showHints} = this.props;
        const {name, isWrong, start, end, messengerList, categoryColor, adviceList} = this.props.item.toJS();
        return (
            <div className={`${styles.item}`}>
                <div className={(isPassed ? styles.itemDataPassed : styles.itemData) + ' ' + (active ? styles.itemDataActive : '')} onClick={this.open}>
                    {
                        showHints && isWrong
                            ? (
                                <div className={styles.alert}>
                                    <AlertIcon className={styles.alertIcon} />
                                </div>
                            )
                            : null
                    }

                    <div className={styles.timeDeco}>
                        <TimeDeco className={styles.timeDecoIcon} />
                    </div>

                    <div className={styles.time}>
                        <div className={styles.timeRow}>{start}</div>
                        <div className={styles.timeRow}>{end}</div>
                    </div>

                    <div className={styles.category}>
                        <CategoryIcon color={categoryColor} />
                    </div>

                    <div className={styles.title}>
                        <span title={name}>{name}</span>
                    </div>
                </div>

                <div className={`${styles.itemControl} ${active ? styles.itemControlActive : ''}`}>
                    <div className={styles.toBack} onClick={this.close}>
                        <RightArrowIcon className={styles.leftIcon} fillClassName={styles.svgFillElement} />
                    </div>

                    <div className={styles.bell}>
                        <div className={styles.iconBox} onClick={this._showMessengers} >
                            {
                                messengerList.some(d => d.installed)
                                    ? <BellIcon width="23px" height="31px" className={styles.bellIcon} />
                                    : <BellIconClosed width="23px" height="31px" className={styles.bellIcon} />
                            }
                        </div>
                    </div>

                    <div ref={r => this._repeats = r} className={styles.repeat}>
                        <div className={styles.iconBox} onClick={this._showRepeats}>
                            <SettingsIcon className={styles.repeatIcon} />
                        </div>
                    </div>

                    <div ref={r => this._up = r} className={styles.up}>
                        <div className={`${styles.iconBox} ${!adviceList.length ? styles.iconBoxDisabled : ''}`} onClick={this._showUps}>
                            <UpIcon className={styles.upIcon} />
                        </div>
                    </div>

                    <div className={styles.bucket}>
                        <div className={styles.iconBox} onClick={this.deleteItem}>
                            <BucketIcon className={styles.bucketIcon} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = PhoneItem;