
const React = require('react');
const { connect } = require('react-redux');
const logger = require('js-logger');

class RegimeRoute extends React.Component {
    static displayName = 'RegimeRoute';

    static propTypes = {
        children: React.PropTypes.any
    };

    constructor (props) {
        super(props);

        this.logger = logger.get(RegimeRoute.displayName);
    }

    render () {
        return this.props.children;
    }
}

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(RegimeRoute);