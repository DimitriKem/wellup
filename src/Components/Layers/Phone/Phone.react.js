
const styles = require('./Phone.less');

const React = require('react');
const logger = require('js-logger');

const Layer = require('./../Layer.react');

const PhoneNavigate = require('./PhoneNavigate/PhoneNavigate.react');
const Controls = require('./Controls/Controls.react');
const PhoneList = require('./PhoneList/PhoneList.react');
const PhonePopUp = require('./PhonePopUp/PhonePopUp.react');

const PopUpContainer = require('./../../../Containers/PopUpContainer.react');
const PhoneMessengersList = require('./PhoneMessengersList/PhoneMessengersList.react');

// Подключается к стору мобильный PopUp
const PopUp = PopUpContainer(PhonePopUp);

class Phone extends Layer {
    static displayName = 'Phone';

    componentWillMount() {
        this.setState({
            showMessengers: false
        });
    }

    constructor(props) {
        super(props);

        this.logger = logger.get(Phone.displayName);
    }

    onToogleShowMessengersList = (value) => {
        this.setState({
            showMessengers: value
        });
    };

    render() {
        const {dispatch, activeItem} = this.props;
        const {currentPage, prevPage, nextPage, messengersList, showHints, showMessengers} = this.state;

        if (!showMessengers) {
            return (
                <div className={styles.layer}>
                    <PhoneNavigate  dispatch={dispatch} page={currentPage} nextPage={nextPage} prevPage={prevPage} />
                    <Controls dispatch={dispatch}
                        pageId={currentPage.get('id')}
                        allowReturnToWellup={currentPage.get('hasChanged')}
                        onToogleShowMessengersList={this.onToogleShowMessengersList}
                    />

                    <div className={styles.content}>
                        <PhoneList
                            dispatch={dispatch}
                            activeItem={activeItem}
                            list={currentPage.get('blockList')}
                            page={currentPage}
                            showHints={showHints} />
                    </div>

                    <PopUp />
                </div>
            );
        } else {
            return (
                <div className={styles.layer}>
                    <PhoneMessengersList dispatch={dispatch} messengersList={messengersList.toJS()} onClose={this.onToogleShowMessengersList} />
                </div>
            )
        }
    }
}

module.exports = Phone;