

const styles = require('./Ups.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');

const PopUpActions = require('./../../../../Actions/PopUpActions').actions;

const UpsItem = require('./UpsItem/UpsItem.react.js');
const RightIcon = require('./../../../Icons/RightArrowIcon.react.js');

class PopUpUps extends React.Component {
    static displayName = 'PopUpUps';
    shouldComponentUpdate = shouldComponentUpdate;

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        upsList: React.PropTypes.any.isRequired,
        blockId: React.PropTypes.any.isRequired,
        pageId: React.PropTypes.any.isRequired
    };

    componentWillMount () {
        const upsList = this.props.upsList && this.props.upsList.toJS() || [];
        this.setState({
            selected: upsList[0] ? upsList[0] : null,
            count: upsList.length,
            position: 0
        });
    }
    
    componentDidUpdate() {
        this.props.dispatch(PopUpActions.resize());
    }

    back = () => {
        const upsList = this.props.upsList && this.props.upsList.toJS() || [];
        let position = this.state.position - 1;
        if (position < 0) {
            position = upsList.length - 1;
        }

        this.setState({
            selected: upsList[position],
            count: upsList.length,
            position: position
        });
    }

    next = () => {
        const upsList = this.props.upsList && this.props.upsList.toJS() || [];
        let position = this.state.position + 1;
        if (position >= upsList.length) {
            position = 0;
        }

        this.setState({
            selected: upsList[position],
            count: upsList.length,
            position: position
        });
    }
    
    render() {
        const {selected, position, count} = this.state;
        const {dispatch} = this.props;

        if (selected) {
            return (
                <div className={styles.ups}>
                    <h2 className={styles.header}>{selected.name}</h2>
                    <UpsItem key={selected.id} {...selected} dispatch={dispatch} />

                    {
                        count > 1
                            ? (
                                <div className={styles.navigate}>
                                    <div className={styles.icon} onClick={this.back}>
                                        <RightIcon className={styles.leftIcon} fillClassName={styles.svgFillElement} />
                                    </div>
                                    
                                    <div  className={styles.counts}>
                                        {`${position + 1} из ${count}`}
                                    </div>

                                    <div className={styles.icon} onClick={this.next}>
                                        <RightIcon className={styles.rightIcon} fillClassName={styles.svgFillElement} />
                                    </div>
                                </div>
                            )
                            : null
                    }
                </div>
            );
        }

        return (
            <div className={styles.messengers}>
                <h2>Нет советов</h2>
            </div>
        );
    }
}

module.exports = PopUpUps;