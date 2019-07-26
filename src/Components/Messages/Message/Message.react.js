
const React = require('react');
const styles = require('./../Messages.less');
const shouldComponentUpdate = require('react-pure-render/function');
const logger = require('js-logger');
const {Message} = require('./../../../Actions/MessagesActions');

class MessageComponent extends React.Component {
    static displayName = 'MessageComponent';
    shouldComponentUpdate = shouldComponentUpdate;
    logger = null;

    static propTypes = {
        message: React.PropTypes.instanceOf(Message).isRequired,
        closeMessage: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.logger = logger.get(MessageComponent.displayName);
    }

    componentDidMount() {
        const {message} = this.props;
        this.logger.debug('Did mount', message);
    }

    componentWillUnmount() {
        const {message} = this.props;
        this.logger.debug('Will unmount', message);
    }

    render () {
        const {message} = this.props;
        let className;

        switch (message.getType()) {
            case Message.MESSAGE_TYPE_INFO: className = styles.message; break;
            case Message.MESSAGE_TYPE_SUCCESS: className = styles.messageSuccess; break;
            case Message.MESSAGE_TYPE_DANGER: className = styles.messageDanger; break;
            case Message.MESSAGE_TYPE_ERROR: className = styles.messageError; break;
        }

        className += ' ' + message.getClassName();

        return (
            <div className={className}>
                <div className={styles.layer}>
                    <div className={styles.content}>
                        {message.getContent()}
                    </div>
                    <div className={styles.buttons}>
                        {message.getButtons()}
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = MessageComponent;