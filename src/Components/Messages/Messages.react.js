
const styles = require('./Messages.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const logger = require('js-logger');

const Message = require('./Message/Message.react');

class Messages extends React.Component {
    static displayName = 'Messages';
    shouldComponentUpdate  = shouldComponentUpdate;
    logger = null;

    constructor(props) {
        super(props);

        this.logger = logger.get(Messages.displayName);
    }

    static propTypes = {
        messages: React.PropTypes.instanceOf(Map).isRequired,
        closeMessage: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        this.logger.debug('Did mount');
    }

    componentWillUnmount() {
        this.logger.debug('Will unmount');
    }
    
    render () {
        const {messages, closeMessage} = this.props;

        return (
            <div className={messages.size ? styles.messages : styles.messagesHidden}>
                {
                    [...messages.values()].map(message => (
                        <Message key={message.getId()} message={message} closeMessage={closeMessage} />
                    ))
                }
            </div>
        )
    }
}
module.exports = Messages;