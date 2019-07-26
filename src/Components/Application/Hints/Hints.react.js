
const styles = require('./Hints.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
const logger = require('js-logger');

/**
 * @class Hints
 * @extends React.Component
 * */
class Hints extends React.Component {
    static displayName = 'Hints';
    shouldComponentUpdate  = shouldComponentUpdate;
    logger = null;

    constructor(props) {
        super(props);

        this.logger = logger.get(Hints.displayName);
    }

    static propTypes = {
        showHints: React.PropTypes.bool.isRequired,
        expertList: React.PropTypes.any.isRequired
    };

    componentDidMount() {
        this.logger.debug('Did mount');
    }

    componentWillUnmount() {
        this.logger.debug('Will unmount');
    }
    
    render () {
        const {showHints} = this.props;
        const expertList = showHints
            ? this.props.expertList.map((expert, id)=> (
                <div className={styles.hint} key={id}>
                    <div className={`${styles.imgBox} ${expert.color}`}>
                        <img className={styles.img} src={expert.img} alt={expert.name} />
                    </div>
                    <div className={styles.text}>
                        <div className={styles.name}>{expert.name}</div>
                        <div className={styles.description}>{expert.description}</div>
                    </div>
                </div>
            ))
            : null;

        
        return (
            <ReactCSSTransitionGroup
                transitionName={{
                    enter: styles.itemEnter,
                    enterActive: styles.itemEnterActive,
                    leave: styles.itemLeave,
                    leaveActive: styles.itemLeaveActive,
                }}
                className={styles.itemsBox}
                component="div"
                transitionAppear={false}
                transitionEnter={true}
                transitionEnterTimeout={300}
                transitionLeave={true}
                transitionLeaveTimeout={300}
            >
                {
                    showHints
                        ? (
                            <div className={styles.container}>
                                <div className={styles.header}>Режим дня постоянно сбивается?</div>
                                <div className={styles.hintText}>Четко следовать своему плану поможет</div>
                                {expertList}
                            </div>
                        )
                        : null
                }
            </ReactCSSTransitionGroup>
        );
    }
}
module.exports = Hints;