
const { connect } = require('react-redux');
const { bindActionCreators } = require('redux');

const Messages = require('./../Components/Messages/Messages.react');

const MessagesActions = require('./../Actions/MessagesActions').actions;

function mapStateToProps(state) {
    return {
        messages: state.messages.list
    };
}

function mapDispatchToProps(dispatch) {
    return {
        closeMessage: bindActionCreators(MessagesActions.removeMessage, dispatch)
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Messages);