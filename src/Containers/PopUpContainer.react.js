
const { connect } = require('react-redux');
const { bindActionCreators } = require('redux');

const PopUpActions = require('./../Actions/PopUpActions').actions;

function mapStateToProps(state) {
    return {
        popUp: state.popUp
    };
}

function mapDispatchToProps(dispatch) {
    return {
        closePopUp: bindActionCreators(PopUpActions.hidePopUpWithDeactivate, dispatch),
        closePopUpWithoutDeactivate: bindActionCreators(PopUpActions.hidePopUp, dispatch)
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps);