

const styles = require('./Desktop.less');

const React = require('react');
const logger = require('js-logger');

const Layer = require('./../Layer.react');

const DesktopNavigate = require('./DesktopNavigate/DesktopNavigate.react');
const DesktopList = require('./DesktopList/DesktopList.react');
const RightContent = require('./RightContent/RightContent.react');
const DesktopPopUp = require('./DesktopPopUp/DesktopPopUp.react');

const PopUpContainer = require('./../../../Containers/PopUpContainer.react');

const PopUp = PopUpContainer(DesktopPopUp);

class Desktop extends Layer {
    static displayName = 'Desktop';
    
    constructor(props) {
        super(props);
        
        this.logger = logger.get(Desktop.displayName);
    }
    
    render() {
        const {dispatch, activeItem} = this.props;
        const {currentPage, prevPage, nextPage, messengersList, showHints, expertList} = this.state;
        return (
            <div className={styles.layer}>
                <DesktopNavigate dispatch={dispatch} page={currentPage} prevPage={prevPage} nextPage={nextPage} />

                <div className={styles.content}>
                    <DesktopList
                        dispatch={dispatch}
                        activeItem={activeItem}
                        list={currentPage.get('blockList')}
                        page={currentPage}
                        showHints={showHints} />
                    <RightContent pageId={currentPage.get('id')} hasChangedDay={currentPage.get('hasChanged')} dispatch={dispatch} messengersList={messengersList} showHints={showHints} expertList={expertList} />
                </div>

                <PopUp />
            </div>
        )
    }
}

module.exports = Desktop;