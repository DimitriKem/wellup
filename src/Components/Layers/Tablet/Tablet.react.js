

const styles = require('./Tablet.less');

const React = require('react');
const logger = require('js-logger');

const Layer = require('./../Layer.react');

const TabletNavigate = require('./TabletNavigate/TabletNavigate.react');
const TabletList = require('./TabletList/TabletList.react');
const TabletPopUp = require('./TabletPopUp/TabletPopUp.react');
const Controls = require('./../Phone/Controls/Controls.react');
const PhoneMessengersList = require('./../Phone/PhoneMessengersList/PhoneMessengersList.react');

const PopUpContainer = require('./../../../Containers/PopUpContainer.react');

const PopUp = PopUpContainer(TabletPopUp);
class Tablet extends Layer {
    static displayName = 'Tablet';

    constructor(props) {
        super(props);

        this.logger = logger.get(Tablet.displayName);
    }

    onToogleShowMessengersList = (value) => {
        this.setState({
            showMessengers: value
        });
    };

    render() {
        const {dispatch, activeItem} = this.props;
        const {currentPage, nextPage, prevPage, showHints, messengersList, showMessengers} = this.state;
        if (!showMessengers) {
            return (
                <div className={styles.layer}>
                    <TabletNavigate dispatch={dispatch} page={currentPage} nextPage={nextPage} prevPage={prevPage} />
                    <Controls dispatch={dispatch}
                        pageId={currentPage.get('id')}
                        allowReturnToWellup={false}
                        onToogleShowMessengersList={this.onToogleShowMessengersList}
                    />

                    <div className={styles.content}>
                        <TabletList
                            dispatch={dispatch}
                            activeItem={activeItem}
                            page={currentPage}
                            list={currentPage.get('blockList')}
                            showHints={showHints} />
                    </div>

                    <PopUp />
                </div>
            )
        } else {
            return (
                <div className={styles.layer}>
                    <PhoneMessengersList dispatch={dispatch} messengersList={messengersList.toJS()} onClose={this.onToogleShowMessengersList} />
                </div>
            )
        }
    }
}

module.exports = Tablet;