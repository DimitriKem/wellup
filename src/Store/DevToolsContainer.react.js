
const React = require('react');
const { connect } = require('react-redux');
const { createDevTools } = require('redux-devtools');

// Monitors are separate packages, and you can make a custom one
const LogMonitor = require('redux-devtools-log-monitor').default;
const DockMonitor = require('redux-devtools-dock-monitor').default;

// createDevTools takes a monitor and produces a DevTools component
var DevTools = createDevTools(
    // Monitors are individually adjustable with props.
    // Consult their repositories to learn about those props.
    // Here, we put LogMonitor inside a DockMonitor.
    <DockMonitor toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'
                 fluid={false}>
        <LogMonitor theme="tomorrow" />
    </DockMonitor>
);


class DevToolsComponent extends React.Component {
    render () {
        return process.env.NODE_ENV === 'production'? null : <DevTools />;
    }
}

module.exports = {
    default: connect()(DevToolsComponent),
    DevTools
};