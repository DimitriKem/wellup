
const { connect } = require('react-redux');

function mapStateToProps(state) {
    return {
        hour: state.background.hour,
        activeItem: state.activeItem,
        popUp: state.popUp,
        application: state.application
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps);